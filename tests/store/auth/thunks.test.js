import { signInWithGoogle } from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

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

  it("startGoogleSignIn should trigger checkingCredentials and login - success", async () => {
    const loginData = { ok: true, user: demoUser };
    // mock provider response
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it("startGoogleSignIn should trigger checkingCredentials and login - error", async () => {
    const loginData = { ok: false, errorMessage: "Error on google" };
    // mock provider response
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });
});
