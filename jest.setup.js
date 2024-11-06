// En caso de necesitar la implementación del FetchAPI
import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import { getEnvironments } from "./src/helpers/getEnvironments";

// load .env.testing file to mock env variables for testing environment
require("dotenv").config({
  path: ".env.testing",
});
// mock .env variables
jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));