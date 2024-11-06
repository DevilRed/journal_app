// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
const env = getEnvironments();
console.log(env);// 8.21
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyDdkYdWcDyP79ZAzu18LWtg243kyFK7oGM",
  authDomain: "react-journal-app-613a8.firebaseapp.com",
  projectId: "react-journal-app-613a8",
  storageBucket: "react-journal-app-613a8.appspot.com",
  messagingSenderId: "481904725054",
  appId: "1:481904725054:web:b075236bcf4978226c956f",
}; */
const firebaseConfig = {
  apiKey: "AIzaSyAaykH-Y2IBWcda4JmOcmNYxVj-Gf714n0",
  authDomain: "react-journal-app-testin-a17f8.firebaseapp.com",
  projectId: "react-journal-app-testin-a17f8",
  storageBucket: "react-journal-app-testin-a17f8.firebasestorage.app",
  messagingSenderId: "345096008229",
  appId: "1:345096008229:web:3d183c334593dbba6bc5cc",
};



// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// auth
export const firebaseAuth = getAuth(firebaseApp);
// get db access
export const firebaseDB = getFirestore(firebaseApp);
