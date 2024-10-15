// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkvwEuQJisIa3IiTlej_abSP7a72v3oOc",
  authDomain: "aplikacjaczytelnicza.firebaseapp.com",
  projectId: "aplikacjaczytelnicza",
  storageBucket: "aplikacjaczytelnicza.appspot.com",
  messagingSenderId: "405565692319",
  appId: "1:405565692319:web:f9bf5581fd0c7745ea85aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);