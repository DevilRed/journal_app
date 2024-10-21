import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginUserWithEmailPassword,
  logoutFirebase,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, message } = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ message }));
    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, message, displayName } =
      await loginUserWithEmailPassword({
        email,
        password,
      });
    if (!ok) return dispatch(logout({ message }));
    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await logoutFirebase();
      dispatch(logout()); // from auth slice
    } catch (error) {
      console.log(error);
    }
  };
};