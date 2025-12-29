// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "khanewalabazzar.firebaseapp.com",
  projectId: "khanewalabazzar",
  storageBucket: "khanewalabazzar.firebasestorage.app",
  messagingSenderId: "268212414828",
  appId: "1:268212414828:web:dcf1a52ffe979a7a86ab49",
  measurementId: "G-RGE664ZM2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export {app, auth}

