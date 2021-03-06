import renderTransContent from "../../test-helpers/renderTransContent";
import Component from "./index";
import AUTH_STRINGS from "../../../data/authStrings";

describe("<RetroCertsCertificationPage />", () => {
  it("Certify week not found.", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1],
        programPlan: ["UI full time", "UI part time"],
      },
      setUserData: () => {},
      routeComputedMatch: {
        params: {
          week: "2020-02-07", // This date is invalid.
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("Certify for one week of 2", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1],
        programPlan: ["UI full time", "UI part time"],
        formData: [{ weekIndex: 0, tooSick: false, fullTime: true }],
      },
      setUserData: () => {},
      routeComputedMatch: {
        params: {
          week: "2020-02-08",
        },
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("Certify for 2nd week of 2", async () => {
    const wrapper = renderTransContent(Component, {
      userData: {
        status: AUTH_STRINGS.statusCode.ok,
        weeksToCertify: [0, 1],
        programPlan: ["UI full time", "UI part time"],
        formData: [
          {
            weekIndex: 0,
            tooSick: true,
            fullTime: true,
            didYouLook: true,
            refuseWork: true,
            schoolOrTraining: true,
            workOrEarn: true,
          },
          {
            weekIndex: 0,
            tooSick: false,
            fullTime: false,
            didYouLook: false,
            refuseWork: false,
            schoolOrTraining: false,
            workOrEarn: false,
          },
        ],
      },
      setUserData: () => {},
      routeComputedMatch: {
        params: {
          week: "2020-02-15",
        },
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
