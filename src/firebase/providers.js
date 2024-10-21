import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result)// get credentials
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    // const email = error.customData.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
    return {
      ok: false,
      message: errorMessage,
    };
  }
};
// add user provider
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    // update user
    // on successful creation of user account, the user is also signed by firebase
    await updateProfile(firebaseAuth.currentUser, {
      displayName,
    });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const loginUserWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};
