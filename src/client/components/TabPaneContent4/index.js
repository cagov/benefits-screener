import { Trans, useTranslation } from "react-i18next";
import React from "react";

function TabPaneContent4() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>
        <Trans t={t} i18nKey="tab4-header1" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab4-p1" />
      </p>

      <p>
        <Trans t={t} i18nKey="tab4-p2" />
      </p>

      <div className="highlight-blockquote">
        <Trans t={t} i18nKey="tab4-blockquote1" />
      </div>

      <p>
        <Trans t={t} i18nKey="tab4-p3">
          To set up direct deposit transfer from your debit card to your bank
          account, visit the{" "}
          <a href="https://prepaid.bankofamerica.com/EddCard">
            Bank of America EDD Debit Card website
          </a>
          .
        </Trans>
      </p>

      <p>
        <Trans t={t} i18nKey="tab4-p4">
          For more information on the EDD Debit Card, visit{" "}
          <a href="https://www.edd.ca.gov/about_edd/The_EDD_Debit_Card.htm">
            EDD Debit Card
          </a>
          .
        </Trans>
      </p>

      <h4>
        <Trans t={t} i18nKey="tab4-header2" />
      </h4>
      <ul>
        <li>
          <Trans t={t} i18nKey="tab4-list1-item1" />
          <ul>
            <li>
              <Trans t={t} i18nKey="tab4-list1a-item1">
                <strong>Note:</strong> If you were issued a card before 2015,
                you must visit{" "}
                <a href="https://prepaid.bankofamerica.com/eddcard/ReplaceMyCard/verify">
                  Replace my Card
                </a>{" "}
                or contact Bank of America at 1-866-692-9374 (TTY:
                1-866-656-5913) to request a new one.
              </Trans>
            </li>
          </ul>
        </li>
        <li>
          <Trans t={t} i18nKey="tab4-list1-item2">
            <strong>If you lost your EDD Debit Card</strong>, visit{" "}
            <a href="https://prepaid.bankofamerica.com/eddcard/ReplaceMyCard/verify">
              Replace my Card
            </a>{" "}
            or contact Bank of America at 1-866-692-9374 (TTY: 1-866-656-5913).
            You do not need to speak to a representative. Choose the “lost or
            stolen” option in the automated menu. Your new card will arrive 7 to
            10 business days from the order date.
          </Trans>
        </li>
        <li>
          <Trans t={t} i18nKey="tab4-list1-item3" />
        </li>
        <li>
          <Trans t={t} i18nKey="tab4-list1-item4" />
        </li>
      </ul>
      <h3>
        <Trans t={t} i18nKey="tab4-header3" />
      </h3>

      <p>
        <Trans t={t} i18nKey="tab4-p5" />
      </p>

      <div className="gray-box">
        <h4>
          <Trans t={t} i18nKey="tab4-header4" />
        </h4>
        <p>
          <Trans t={t} i18nKey="tab4-p6" />
        </p>
        <ul>
          <li>
            <Trans t={t} i18nKey="tab4-list2-item1" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab4-list2-item2" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab4-list2-item3" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab4-list2-item4" />
          </li>
          <li>
            <Trans t={t} i18nKey="tab4-list2-item5" />
          </li>
        </ul>
        <p>
          <Trans t={t} i18nKey="tab4-p7">
            The fastest way to certify is on{" "}
            <a href="https://portal.edd.ca.gov/WebApp/Login?resource_url=https%3A%2F%2Fportal.edd.ca.gov%2FWebApp%2FHome">
              UI Online
            </a>
            . You can also do this by phone by calling 1-866-333-4606, or by
            mailing the paper form.
          </Trans>
        </p>
      </div>

      <h4>
        <Trans t={t} i18nKey="tab4-header5" />
      </h4>
      <p>
        <Trans t={t} i18nKey="tab4-p8" />
      </p>
      <h4>
        <Trans t={t} i18nKey="tab4-header6" />
      </h4>
      <p>
        <Trans t={t} i18nKey="tab4-p9" />
      </p>

      <p>
        <Trans t={t} i18nKey="tab4-p10" />
      </p>
    </div>
  );
}

export default TabPaneContent4;
