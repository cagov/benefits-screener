import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import React from "react";
import AUTH_STRINGS from "../../../data/authStrings";
import { userDataPropType, setUserDataPropType } from "../../commonPropTypes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import YesNoQuestion from "../../components/YesNoQuestion";

function RetroCertsLandingPage(props) {
  const userData = props.userData;
  const setUserData = props.setUserData;
  const history = useHistory();

  // Removes the users session token which logs the user out.
  function logout() {
    sessionStorage.removeItem(AUTH_STRINGS.authToken);
    setUserData({ status: AUTH_STRINGS.statusCode.notLoggedIn });
    history.push("/retroactive-certification");
  }

  return (
    <div id="overflow-wrapper">
      <Header />
      <main>
        <div className="container p-4">
          <h1>Hello</h1>
          <p>Weeks to certify: {userData.weeksToCertify.join(", ")}</p>
          <p>
            <Button variant="link" onClick={logout}>
              Clear Session
            </Button>
          </p>
          <ol>
            {[1, 2, 3].map((index) => (
              <YesNoQuestion
                key={index}
                questionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque."
                helpText="Aliquam fermentum, tortor in pulvinar."
                inputName={`YesNo${index}`}
              />
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
}

RetroCertsLandingPage.propTypes = {
  userData: userDataPropType,
  setUserData: setUserDataPropType,
};

export default RetroCertsLandingPage;
