// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHPtkh0yHyp8IntiixkaE1TK536z4kxx8",
  authDomain: "react-journal-c1629.firebaseapp.com",
  projectId: "react-journal-c1629",
  storageBucket: "react-journal-c1629.appspot.com",
  messagingSenderId: "668958513871",
  appId: "1:668958513871:web:890a94ae49359b09b375ba",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// auth
export const firebaseAuth = getAuth(firebaseApp);
// get db access
export const firebaseDB = getFirestore(firebaseApp);
