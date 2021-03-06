import "dotenv/config";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

// Setup Enzyme for React component tests
Enzyme.configure({ adapter: new Adapter() });

// Mock manifest files, which are generated as part of the build process
jest.mock(
  "./src/data/manifest-scripts.json",
  () => ({
    client: {
      js: "/mocked-client.js",
    },
  }),
  { virtual: true }
);
jest.mock(
  "./src/data/manifest-styles.json",
  () => ({
    "App.css": "mocked-app.css",
  }),
  { virtual: true }
);

// Google's test environment secret
process.env.RECAPTCHA_SECRET = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
process.env.COSMOS_DB_KEY = "mock-cosmos-db-key";

jest.mock("@azure/cosmos", () => {
  const actual = jest.requireActual("@azure/cosmos");

  return {
    ...actual,
    CosmosClient: jest.fn(),
  };
});
jest.mock("./src/data/cosmosConfig", () => jest.fn());
jest.mock("./src/data/cosmos");
const cosmos = require("./src/data/cosmos");
cosmos.createRetroCertDatabase(jest.fn());

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useHistory: () => ({
      push: jest.fn(),
      listen: jest.fn(),
      location: { state: { isReturning: true } },
    }),
    useLocation: () => {
      return {};
    },
  };
});

jest.mock("uuid", () => {
  const actual = jest.requireActual("uuid");
  return {
    ...actual,
    v4: () => "00000000-fake-mock-fake-123456789012",
  };
});

// window.gtag is added by Google Analytics. Mock out the calls.
jest.mock("./src/client/utils", () => {
  const actual = jest.requireActual("./src/client/utils");
  return {
    ...actual,
    logEvent: (a, b, c) => {},
    logPage: (a) => {},
  };
});
