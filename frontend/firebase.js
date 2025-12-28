// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "khanewalabazzar-ccd30.firebaseapp.com",
  projectId: "khanewalabazzar-ccd30",
  storageBucket: "khanewalabazzar-ccd30.firebasestorage.app",
  messagingSenderId: "514111211132",
  appId: "1:514111211132:web:14c1c566c1eb91b32a6bf9",
  measurementId: "G-F9CN6GCXLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export {app, auth}

