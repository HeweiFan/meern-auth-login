// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b885e.firebaseapp.com",
  projectId: "mern-auth-b885e",
  storageBucket: "mern-auth-b885e.appspot.com",
  messagingSenderId: "236173364372",
  appId: "1:236173364372:web:be2cc6d574aa3a7553b881"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);