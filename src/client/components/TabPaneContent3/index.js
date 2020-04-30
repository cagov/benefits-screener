import React from "react";
// import { useTranslation } from "react-i18next";

function TabPaneContent3() {
  // const { t } = useTranslation();

  return (
    <div>
      <h3>
        1. We'll confirm your application and weekly benefit amount via email
        and postal mail
      </h3>
      <ul>
        <li>
          You may receive an email confirming that you were automatically
          registered in UI Online. This allows you to fully access information
          about your claim and to certify for continued benefits online.
        </li>
        <li>
          If you're not automatically registered in UI Online, you’ll receive a
          notice in the mail with your EDD Customer Account Number. Use the
          account number to finish registering for full UI Online access.
        </li>
        <li>
          <strong>
            After you submit your initial application, EDD will confirm your
            application and weekly benefit amount via postal mail.
          </strong>{" "}
          You should receive this within two weeks. We'll let you know what your
          weekly benefit amount (WBA) is, based on our wage records. For an
          initial estimate of your weekly benefit amount, use our{" "}
          <a href="https://www.edd.ca.gov/Unemployment/UI-Calculator.htm">
            UI benefit calculator
          </a>
          .
        </li>
      </ul>

      <p>
        If we need more information from you to complete your claim, we may call
        you or mail you a notice. If we are unable to verify your identity or
        your wages, our system might determine your estimated WBA to be $0.00.
        If this happens, we may need more time to process your claim.
      </p>

      <h4>
        For business owners, independent contractors, self-employed workers,
        freelancers, gig workers:
      </h4>

      <p>
        <strong>
          If you qualify for PUA, your initial weekly benefit amount will be
          $167
        </strong>{" "}
        for claims starting February 2, 2020. Claims between March 30 to July 31
        will have an additional, taxable $600. Your total benefits will last for
        39 weeks (including any regular UI and extended benefits you might
        qualify for).
      </p>
      <p>
        <strong>
          Once we verify your income, your weekly benefit amount may increase
        </strong>
        . Any increase will also apply retroactively. We will notify you of any
        increase you are entitled to receive.
      </p>

      <div className="highlight-blockquote">
        <strong>Note:</strong> You will be paid benefits from the date you
        became unemployed as a result of COVID-19, regardless of when you
        submitted your claim application.
      </div>

      <h3>2. Certify for your first benefit payment</h3>

      <div className="highlight-blockquote">
        <strong>Note:</strong> Certification is <strong>not required</strong> at
        this time for benefits with week ending dates of March 14 through May 9,
        2020. The EDD will contact you at a later date to certify for these
        weeks.
      </div>
      <p>When you are required to certify, here’s what you’ll need to do:</p>
      <ul>
        <li>
          <strong>Certify your claim in UI Online</strong> once you're
          registered. You will also be required to certify your claim every two
          weeks.
        </li>
        <li>
          <strong>
            You can answer "No" when we ask whether you are looking for work,
            due to COVID-19.
          </strong>{" "}
          If you meet all other eligibility requirements, you will still receive
          benefits.
        </li>
      </ul>

      <div className="gray-box">
        <h4>What is certification?</h4>
        <p>
          Certification is the required process of updating the EDD every two
          weeks with your unemployment status with basic eligibility
          information:
        </p>
        <ul>
          <li>Are you physically able to work?</li>
          <li>Are you available for work?</li>
          <li>Are you ready and willing to accept work immediately?</li>
          <li>Did you refuse work?</li>
          <li>Did you work and earn wages?</li>
        </ul>
        <p>
          The fastest way to certify is on{" "}
          <a href="https://portal.edd.ca.gov/WebApp/Login?resource_url=https%3A%2F%2Fportal.edd.ca.gov%2FWebApp%2FHome">
            UI Online
          </a>
          . You can also do this by phone by calling 1-866-333-4606, or by
          mailing the paper form.
        </p>
        <div className="highlight-blockquote">
          <strong>Note:</strong> Certification is <strong>not required</strong>{" "}
          at this time for benefits with week ending dates of March 14 through
          May 9, 2020. The EDD will contact you at a later date to certify for
          these weeks.
        </div>
      </div>
      <h3>3. Upload your resume in CalJOBS</h3>
      <div className="highlight-blockquote">
        <strong>Note:</strong> We understand that it’s a difficult time to look
        for a job right now. You are currently <strong>not required</strong> to
        upload your resume to CalJOBS, during the COVID-19 pandemic.
      </div>
      <p>
        <a href="https://www.caljobs.ca.gov/vosnet/Default.aspx">
          Upload your resume in CalJobs
        </a>{" "}
        within 21 days of submitting your application.{" "}
      </p>
    </div>
  );
}

export default TabPaneContent3;
