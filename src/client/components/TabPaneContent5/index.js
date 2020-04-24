import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent5() {
  // const { t } = useTranslation();

  return (
    <div>
      <p>
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/faqs.htm">
          Coronavirus (COVID-19) FAQs from EDD
        </a>
      </p>
      <p>
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/pandemic-unemployment-assistance.htm">
          Pandemic Unemployment Assistance
        </a>
      </p>
      <p>
        <a href="https://edd.ca.gov/about_edd/coronavirus-2019/unemployment-claims.htm">
          Post-Application: COVID-19 Unemployment Insurance Claims
        </a>
      </p>
      <h4>New unemployment programs from the CARES Act</h4>
      <p>
        These programs build on top of Unemployment Insurance (UI) benefits by
        expanding who is eligible, increasing benefit amounts, and extending the
        length of the program.
      </p>
      <h5>Pandemic Unemployment Assistance (PUA)</h5>
      <p>
        <strong>
          This expands who can apply for Unemployment Insurance, due to
          COVID-19.
        </strong>{" "}
        This includes business owners, independent contractors, self-employed
        workers, freelancers, gig workers and people with limited work history.
        PUA supports claims between February 2 and December 31, 2020.
      </p>
      <h5>Federal Pandemic Unemployment Compensation (FPUC)</h5>
      <p>
        <strong>This provides an additional $600 per week</strong> to all
        recipients of Unemployment Insurance. It is retroactive for claims
        between March 30, 2020 and July 31, 2020. This taxable $600 payment is
        issued separately every two weeks. You may receive it at the same time
        as your UI benefits, or in a separate debit card.
      </p>
      <h5>Pandemic Emergency Unemployment Compensation (P-EUC)</h5>
      <p>
        <strong>This provides an additional 13 weeks of benefits</strong> for
        all people receiving UI between March 30, 2020 to December 31, 2020.
        California usually provides 26 weeks of UI benefits. The CARES act
        extends benefits to a total of 39 weeks. If your claim expired recently,
        reopen your claim for an extension.
      </p>
    </div>
  );
}

export default TabPaneContent5;