#!/usr/bin/env python3
import pandas as pd
import numpy as np
import bisect

# Each element of the output has the following properties: id (the hash), programSeekWorkPlan
# (PUA, UI full time, or UI part time; or an array of these three values), and weeksToCertify
# (an array of integer indices corresponding to possible weeks)

# Input csv should have these headers: SHA256_hash,WeekEndingDate,Program,SeekWorkPlan

# Options to set before running the script
use_subset_of_data = False  # Set to True if you're developing and want operations to take less time
generate_from_source = False  # Set to True to regenerate intermediate data first, vs loading saved intermediate data

# A few caveats for future readers:
#
# On performance: modin enables using multiple cores for pandas
# but is "not yet optimized" for all groupby operations,
# and isn't optimized for the groupby operation used in this script

# On storing lists, like in this script: Pandas isn't designed to hold lists in series
# https://meta.stackoverflow.com/questions/373714/generic-dont-do-it-answer

# This script was used for a one-off import, and debugging of that import, so there hasn't
# been effort put into making it usable by anyone other than the author.

# Increase amount of data displayed in terminal
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 200)
pd.set_option('display.width', 1000)

HASH_LENGTH = 66
VALID_WEEKS = [
    "2020-02-08",
    "2020-02-15",
    "2020-02-22",
    "2020-02-29",
    "2020-03-07",
    "2020-03-14",
    "2020-03-21",
    "2020-03-28",
    "2020-04-04",
    "2020-04-11",
    "2020-04-18",
    "2020-04-25",
    "2020-05-02",
    "2020-05-09"
]
WEEKS_TO_INDEX = dict(map(reversed, enumerate(VALID_WEEKS)))  # { "2020-04-15": 0 ... }
INDEX_TO_WEEKS = dict(enumerate(VALID_WEEKS))  # { 0: "2020-04-15"... }
VALID_PROGRAMS = ["DUA", "UI"]
VALID_FT_PLANS = ["A", "B", "AB", "C1", "C2", "C4", "C5", "C6", "X"]
VALID_PT_PLANS = ["PT", "P", "PB", "P1", "P2", "P4", "P5", "P6"]
PUA_PLANS = ["C3"] # We ignore plans if the Program is DUA/PUA, but accept these values for validation's sake
VALID_PLANS = VALID_FT_PLANS + VALID_PT_PLANS + PUA_PLANS
SOURCE_DATA_FILENAME = "users.csv"
INTERMEDIATE_DATA_FILENAME = "intermediate.pkl"
INTERMEDIATE_DATA_100K_FILENAME = "100k.pkl"  # Generate a smaller file of 100k rows during development process
DUPLICATE_HASHES_FILENAME = "duplicate_hashes.xlsx"
FINAL_DATA_100K_FILENAME = "100k.json"
FINAL_DATA_FILENAME = "users.json"
HASHES_INCOMPLETE_FILENAME = "prod_db_users.csv"
MISSING_HASHES_FILENAME = "missing_prod_db_users.json"
FINAL_COLUMN_NAMES = ["id", "programPlan", "weeksToCertify"]


intermediate_filename = INTERMEDIATE_DATA_FILENAME
final_filename = FINAL_DATA_FILENAME
if use_subset_of_data:
    intermediate_filename = INTERMEDIATE_DATA_100K_FILENAME
    final_filename = FINAL_DATA_100K_FILENAME


def generate_final_file():
    def print_rows_with_week_count(df, count):
        print(df.loc[df["week_count"] == count])

    # Print the number of users who need to certify for a total of X weeks, 1 through 14
    # # of weeks  # of users who must certify
    #           1                  19280
    #           2                  808167
    def print_total_weeks_by_user(df):
        df["week_count"] = df["WeekEndingDates"].apply(lambda x: len(x))  # Count number of weeks per user
        series = df["week_count"].value_counts(normalize=True).sort_index().mul(100).round(1).astype(str) + '%'
        result = pd.DataFrame(series).reset_index()
        result.columns = ["# of weeks", "% of users who must certify"]
        print(result.to_string(index=False))

    def print_duplicate_hashes(df):
        df["WeekEndingDates"] = df["WeekEndingDates"].apply(lambda x: [INDEX_TO_WEEKS[y] for y in x])
        dupe_hashes = df[df.duplicated("SHA256_hash", keep=False)]
        dupe_hashes_count = len(dupe_hashes)
        print(f"There are {dupe_hashes_count} duplicate hashes:")
        print(dupe_hashes)
        dupe_hashes.to_excel(DUPLICATE_HASHES_FILENAME)

    # row2 will be prioritized if duplicate found, so make sure row2, and not row1, is the PUA row
    def insert_sorted(row1, row2, first_hashes, is_both_ui):
        weeks_from_row2 = row2["WeekEndingDates"].values[0]
        weeks_from_row1 = row1["WeekEndingDates"].values[0]
        combined_weeks = weeks_from_row2
        plans_from_row2 = row2["SeekWorkPlan"].values[0]
        plans_from_row1 = row1["SeekWorkPlan"].values[0]
        combined_plans = plans_from_row2
        if is_both_ui:
            # There should never be UI full time and UI part time in the same week
            assert (len(np.intersect1d(weeks_from_row2, weeks_from_row1)) == 0)
        for num, week in enumerate(weeks_from_row1):
            if week not in weeks_from_row2:  # if the same week is both PUA and UI, use PUA
                insertion_point = bisect.bisect(combined_weeks, week)  # find the sorted insertion index
                combined_weeks.insert(insertion_point, week)
                combined_plans.insert(insertion_point, plans_from_row1[num])
        first_hashes.at[index, "WeekEndingDates"] = combined_weeks
        first_hashes.at[index, "SeekWorkPlan"] = combined_plans

    # pass in a dataframe with deduplicated hashes
    # returns the rows with hashes present in SOURCE_DATA and not in HASHES_INCOMPLETE_FILENAME
    # outputs them to MISSING_HASHES_FILENAME
    def find_missing_hashes(source):
        INCOMPLETE_HASH_LIST_HASH_LENGTH = 8 # incomplete list has truncated hashes
        START_INDEX = HASH_LENGTH - INCOMPLETE_HASH_LIST_HASH_LENGTH
        df = pd.read_csv(HASHES_INCOMPLETE_FILENAME)
        correct_hash_list = source["SHA256_hash"].str.slice(start=START_INDEX).values.tolist()
        print(f"There are {len(correct_hash_list)} entries in the correct list")
        incomplete_hash_list = df["hash"].values.tolist()
        print(f"There are {len(incomplete_hash_list)} entries in the incomplete list")
        missing_hashes = np.sort(np.setdiff1d(correct_hash_list, incomplete_hash_list, True))
        print(f"There are {len(missing_hashes)} missing hashes which end in:")
        print(missing_hashes)
        missing_rows = source[source["SHA256_hash"].str.endswith("|".join(missing_hashes))]
        missing_rows.columns = FINAL_COLUMN_NAMES
        missing_rows.to_json(MISSING_HASHES_FILENAME, orient="records")
        print(f"There are {len(missing_rows)} entries in {MISSING_HASHES_FILENAME}")
        print(missing_rows)

    print(f"Importing {intermediate_filename}...")
    df = pd.read_pickle(intermediate_filename)
    print(f"Processing {len(df)} rows...")
    # insert your code here or choose one of the print_* functions above

    dupe_hashes = df[df.duplicated("SHA256_hash", keep=False)]  # keep all duplicates
    first_hashes = dupe_hashes[dupe_hashes.duplicated("SHA256_hash", keep="first")]

    # A user should only have up to two Program+SeekWorkPlan combinations
    # E.g. no user should have entries for all three of DUA/PUA + UI full time + UI part time
    assert 2 * len(first_hashes) == len(dupe_hashes)

    counter = 0
    for index, row in first_hashes.iterrows():
        user_rows = dupe_hashes.loc[dupe_hashes["SHA256_hash"] == row["SHA256_hash"]].copy()
        assert(len(user_rows) == 2)
        # Check value in SeekWorkPlan BEFORE expanding it into a filled array
        mask = user_rows["SeekWorkPlan"] == "PUA full time" # creates a Series of booleans
        user_rows["SeekWorkPlan"] = user_rows.apply(
            lambda x: [x["SeekWorkPlan"]] * len(x["WeekEndingDates"]), axis=1)

        pua_row = user_rows[mask]
        ui_rows = user_rows[~mask] # apply inverse of mask
        if len(pua_row) == 1:
            assert(len(ui_rows) == 1)
            # there's one PUA entry and one UI, merge in UI row weeks, making sure PUA overrides UI if same week
            insert_sorted(ui_rows, pua_row, first_hashes, False)
        else:
            assert (len(ui_rows) == 2)
            # there's two UI entries (UI part time and UI full time), merge and check no overlap on the same week
            insert_sorted(ui_rows.iloc[[0]], ui_rows.iloc[[1]], first_hashes, True)

        counter += 1

    df["SeekWorkPlan"] = df["SeekWorkPlan"].apply(lambda x: [x])
    processed = df.drop_duplicates("SHA256_hash", keep=False).append(first_hashes)
    print(f"There are now {len(processed)} rows remaining due to {len(first_hashes)}",
          "users who were part of more than one plan (DUA/PUA, UI full time, UI part time)")
    assert len(df) - len(first_hashes) == len(processed)

    # find_missing_hashes(processed)

    processed.columns = FINAL_COLUMN_NAMES
    processed.to_json(final_filename, orient="records")


# We generate an intermediate file and write it to disk because the groupby is the biggest chunk of work
# and doesn't need to be repeated unless the source CSV has changed
def generate_intermediate_file():


    def validate(df):
        print("Validating SHA256_hash values are all present and valid...")
        invalid_rows = df[df["SHA256_hash"].apply(lambda x: len(str(x)) != HASH_LENGTH)]
        invalid_row_count = len(invalid_rows)
        if invalid_row_count > 0:
            print_invalid_rows(invalid_rows, "SHA256_hash", invalid_row_count)

        validate_column(df, "WeekEndingDate", VALID_WEEKS)
        validate_column(df, "Program", VALID_PROGRAMS)
        validate_column(df, "SeekWorkPlan", VALID_PLANS)

        # Insert your own code here or print_duplicate_program_weeks(df)
        print("All values valid!\n")

    def generate_intermediate_data(df):
        df = df.copy() # TODO(kalvin): figure out if there's a better way to avoid SettingWithCopyWarning error
        print(
            "Grouping by SHA256_hash/user, replacing WeekEndingDates with indices, ",
            "merging all WeekEndingDates into one array per user...")
        if use_subset_of_data:
            print("Selecting first 100,000 rows (use_subset_of_data)")
            df = df.head(100000)
        df["SeekWorkPlan"][df["Program"] == "DUA"] = "PUA full time"
        df["SeekWorkPlan"] = df["SeekWorkPlan"].replace(VALID_FT_PLANS, "UI full time") \
            .replace(VALID_PT_PLANS, "UI part time")
        df.drop(columns="Program", inplace=True)
        output = df.replace({"WeekEndingDate": WEEKS_TO_INDEX}) \
            .groupby(["SHA256_hash", "SeekWorkPlan"]).agg(list) \
            .reset_index().rename(columns={"WeekEndingDate": "WeekEndingDates"})
        result_count = len(output)

        print(f"{result_count} resulting users. Here's a few sample rows:")
        print(output.head())

        return output

    def print_invalid_rows(invalid_rows, row_name, invalid_row_count):
        print(f"Invalid {row_name} rows ({invalid_row_count}) listed below:")
        print(invalid_rows)
        print("Not generating intermediate file due to invalid input")
        exit()

    def validate_column(df, col_name, valid_values):
        print(f"Validating {col_name} values are all present and valid...")
        invalid_rows = df[~df[col_name].isin(valid_values)]
        invalid_row_count = len(invalid_rows)
        if invalid_row_count > 0:
            print_invalid_rows(invalid_rows, col_name, invalid_row_count)

    def print_duplicate_program_weeks(df):
        dupe_hashes = df[df.duplicated(["SHA256_hash", "WeekEndingDate"], keep=False)]
        dupe_hashes_count = len(dupe_hashes)
        user = len(dupe_hashes)
        unique_users_count = len(dupe_hashes["SHA256_hash"].unique())
        print(f"There are {unique_users_count} users with both UI and PUA entries for the same week, ",
              "over {dupe_hashes_count} records:")
        print(dupe_hashes)

    print(f"Importing from {SOURCE_DATA_FILENAME} and removing leading/trailing whitespace...")

    df = pd.read_csv(SOURCE_DATA_FILENAME).apply(lambda x: x.str.strip())
    row_count = len(df)
    print(f"Imported {row_count} rows.\n")
    validate(df)

    output = generate_intermediate_data(df)

    print(f"Writing results to {intermediate_filename}...")
    output.to_pickle(intermediate_filename)

    print("Success!")


if generate_from_source:
    generate_intermediate_file()
generate_final_file()
