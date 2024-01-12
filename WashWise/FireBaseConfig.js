// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF0MXMkI7aSfu0X0Vx2nm8-fCe51HxlBU",
  authDomain: "washwise-b784e.firebaseapp.com",
  projectId: "washwise-b784e",
  storageBucket: "washwise-b784e.appspot.com",
  messagingSenderId: "739657637572",
  appId: "1:739657637572:web:c5217f3a1d9736df39b391",
  measurementId: "G-K6P6JZ6NJB",
  databaseURL: "https://washwise-b784e-default-rtdb.firebaseio.com/"

};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const DB = getDatabase(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);