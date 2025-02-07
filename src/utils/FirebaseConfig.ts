// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo9I8GFpiGDBEWtqSuP6U0IctzPH3SxkQ",
  authDomain: "ecuaplanet-34ad7.firebaseapp.com",
  projectId: "ecuaplanet-34ad7",
  storageBucket: "ecuaplanet-34ad7.firebasestorage.app",
  messagingSenderId: "639173005978",
  appId: "1:639173005978:web:165863f910ac0449f9c523"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
