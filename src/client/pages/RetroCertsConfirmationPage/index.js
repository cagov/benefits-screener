import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { userDataPropType } from "../../commonPropTypes";
import routes from "../../../data/routes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";
import ListOfWeeksWithDetail from "../../components/ListOfWeeksWithDetail";
import { logEvent } from "../../utils";
import { clearAuthToken } from "../../components/SessionTimer";
import programPlan from "../../../data/programPlan";

function RetroCertsConfirmationPage(props) {
  const { t } = useTranslation();
  document.title = t("retrocerts-confirmation.title");
  const history = useHistory();
  const userData = props.userData;
  const isAnyWeekPua = userData.programPlan.includes(programPlan.puaFullTime);

  const [showDetail, setShowDetail] = useState(false);

  // The user is here by accident. Send them back.
  if (!userData.confirmationNumber) {
    // For now, send them to the what-to-expect page, but
    // in the future, go to the first week without data.
    return <Redirect to={routes.retroCertsWeeksToCertify} />;
  }

  // For historical reasons the confirmation code is stored as a uuidv4
  // hash in the database, but we display only the last 7 characters to the user.
  const shorterLength = 7;
  const startIndex = userData.confirmationNumber.length - shorterLength;
  const shortConfirmationNumber = userData.confirmationNumber
    .substr(startIndex)
    .toUpperCase();

  // Log out the user since they are done!
  clearAuthToken();

  const isReturning =
    history.location.state && history.location.state.isReturning;
  if (isReturning) {
    logEvent("RetroCerts", "AlreadyCompletedReturn");
  }

  function handlePrint() {
    logEvent("RetroCerts", "PrintConfirmation");
    window.print();
  }

  function AcknowledgementDetail(props) {
    return (
      <div className="detail">
        {isAnyWeekPua ? (
          <ul>
            <li>{t("retrocerts-certification.ack-list-pua-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-pua-item-3")}</li>
          </ul>
        ) : (
          <ul>
            <li>{t("retrocerts-certification.ack-list-item-1")}</li>
            <li>{t("retrocerts-certification.ack-list-item-2")}</li>
            <li>{t("retrocerts-certification.ack-list-item-3")}</li>
            <li>{t("retrocerts-certification.ack-list-item-4")}</li>
          </ul>
        )}
        <input type="checkbox" checked disabled />
        {t("retrocerts-certification.ack-label")}
      </div>
    );
  }

  const EN_DASH = "–";
  return (
    <div id="overflow-wrapper">
      <Header />
      <main id="certification-page" className="pb-5">
        <div className="container p-4">
          <h1>{t("retrocerts-confirmation.title")}</h1>
          <LanguageSelector className="mt-3 mb-4" />
          <Alert variant="success" className="mt-5">
            <img
              className="checkmark"
              src="/images/check-circle-fill.svg"
              alt={t("iconAltText.checkmark")}
            />
            {t(
              isReturning
                ? "retrocerts-confirmation.alert-returning"
                : "retrocerts-confirmation.alert"
            )}
          </Alert>
          <h2 className="mt-5">{t("retrocerts-confirmation.header1")}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="retrocerts-confirmation.p1"
              values={{ confirmationNumber: shortConfirmationNumber }}
            />
          </p>
          <p>{t("retrocerts-confirmation.p1a")}</p>
          <p>{t("retrocerts-confirmation.p1b")}</p>
          <h2 className="mt-5">{t("retrocerts-confirmation.header2")}</h2>
          <ListOfWeeksWithDetail userData={userData} />
          <Alert variant="secondary" className="d-flex">
            <div className="flex-fill">
              <button
                className="toggleAccordion"
                onClick={() => setShowDetail(!showDetail)}
              >
                <span className="toggleCharacter">
                  {showDetail ? EN_DASH : "+"}
                </span>
                <strong>{t("retrocerts-certification.ack-header")}</strong>
              </button>
            </div>
          </Alert>
          {showDetail && <AcknowledgementDetail className="detail" />}

          <h2 className="mt-5">{t("retrocerts-confirmation.header3")}</h2>
          <p>
            <Trans t={t} i18nKey="retrocerts-confirmation.p2">
              If you are still unemployed, continue to certify for benefits
              every two weeks. The fastest way is to use{" "}
              <a href={t("links.edd-login")}>UI Online</a>.
            </Trans>
          </p>

          <Button
            variant="outline-secondary"
            className="text-dark bg-light mt-5"
            onClick={handlePrint}
          >
            {t("retrocerts-confirmation.button-print")}
          </Button>
        </div>
      </main>
      <Footer backToTopTag="certification-page" />
    </div>
  );
}

RetroCertsConfirmationPage.propTypes = {
  userData: userDataPropType,
};

export default RetroCertsConfirmationPage;
