/**
 * Constants used by authentication.
 */

const retroCertsBasePath = "/retroactive-certification";

const AUTH_STRINGS = {
  authToken: "authToken", // Session storage key.
  apiPath: {
    login: retroCertsBasePath + "/api/login",
    data: retroCertsBasePath + "/api/data",
    save: retroCertsBasePath + "/api/save",
  },
  staffView: {
    root: retroCertsBasePath + "/staff-view",
    login: retroCertsBasePath + "/staff-view/api/login",
  },
  statusCode: {
    ok: "ok",
    notLoggedIn: "not-logged-in",
    userNotFound: "user-not-found",
    recaptchaInvalid: "recaptcha-invalid",
    sessionTimedOut: "session-timed-out",
  },
};

module.exports = AUTH_STRINGS;
