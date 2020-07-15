import PropTypes from "prop-types";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

function WeekConfirmationDetails(props) {
  const { employers, questionAnswers, questionKeys, weekString } = props;
  const { t } = useTranslation();

  const employerAddressFieldNames = [
    "employerName",
    "address1",
    "address2",
    "city",
    "state",
    "zipcode",
  ];

  const employerDetailsFieldNames = [
    "lastDateWorked",
    "totalHoursWorked",
    "grossEarnings",
    "reason",
    "moreDetails",
  ];

  const employerDetailsFieldKeys = employerDetailsFieldNames.map((name) =>
    prefix(name)
  );

  function prefix(key) {
    return "retrocerts-certification.employers." + key;
  }

  function ListOfEmployers(props) {
    return employers.map((employer, index) => {
      return <Employer key={index} employerIndex={index} />;
    });
  }

  function Employer(props) {
    const { employerIndex } = props;
    return (
      <React.Fragment>
        <p>{t(prefix("heading"), { incomeNumber: employerIndex + 1 })}</p>
        <p>
          <strong>
            <EmployerAddress employerIndex={employerIndex} />
          </strong>
        </p>
        <EmployerDetails employerIndex={employerIndex} />
      </React.Fragment>
    );
  }
  Employer.propTypes = {
    employerIndex: PropTypes.number,
  };

  function EmployerAddress(props) {
    const { employerIndex } = props;
    const employer = employers[employerIndex];
    return employerAddressFieldNames.map((field, index) => {
      return (
        <React.Fragment key={index}>
          {employer[field]}
          <br />
        </React.Fragment>
      );
    });
  }
  EmployerAddress.propTypes = {
    employerIndex: PropTypes.number,
  };

  function EmployerDetails(props) {
    const { employerIndex } = props;

    return employerDetailsFieldKeys.map((questionKey, index) => {
      const question = t(questionKey);
      const employer = employers[employerIndex];
      const questionName = employerDetailsFieldNames[index];
      const answer = getSubmittedAnswer(questionName, employer);

      return (
        <React.Fragment key={index}>
          <p>{question}</p>
          <p>
            <strong>{answer}</strong>
          </p>
        </React.Fragment>
      );
    });
  }
  EmployerDetails.propTypes = {
    employerIndex: PropTypes.number,
  };

  function getSubmittedAnswer(questionName, employer) {
    const answer = employer[questionName];
    if (answer === "") {
      // The only case where the answer should be an empty string is for
      // the "provide more details" question, and then only
      // if the answer to "reason you're not working" was "still working PT"
      return "N/A";
    }
    if (
      answer === undefined ||
      (answer === "" && employer.reason !== "still-working")
    ) {
      // TODO turn this into an error we log
      console.log("missing answer", questionName, employer);
    }

    if (questionName === "reason") {
      return t(prefix("reason-" + answer));
    } else if (questionName === "grossEarnings") {
      return "$" + answer;
    }

    return answer;
  }

  return questionKeys.map((questionKey, index) => {
    const questionNumber = index + 1;
    const answer = questionAnswers[index];
    const showEmployers = questionKey.endsWith("workOrEarn") && employers;

    return (
      <React.Fragment key={index}>
        <p>
          {questionNumber}.{" "}
          <Trans t={t} i18nKey={questionKey} values={{ weekString }} />
        </p>
        <p>
          <strong>{answer}</strong>
        </p>
        {showEmployers && <ListOfEmployers />}
      </React.Fragment>
    );
  });
}
WeekConfirmationDetails.propTypes = {
  employers: PropTypes.arrayOf(PropTypes.object),
  questionAnswers: PropTypes.array,
  questionKeys: PropTypes.arrayOf(PropTypes.string),
  weekString: PropTypes.string,
};

export default WeekConfirmationDetails;
