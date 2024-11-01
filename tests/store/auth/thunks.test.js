import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";

// mock entire module
jest.mock("../../../src/firebase/providers");

describe("Auth thunks", () => {
  // mock dispatch function to easy expects
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  it("should trigger checkingCredentials", async () => {
    // give inner dispatch param
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
