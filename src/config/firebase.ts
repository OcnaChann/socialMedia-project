// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASxZx0Q6qgGsqtI6r0uNvmHwxUOlT_R20",
  authDomain: "socialmedia-a6e47.firebaseapp.com",
  projectId: "socialmedia-a6e47",
  storageBucket: "socialmedia-a6e47.appspot.com",
  messagingSenderId: "175063296694",
  appId: "1:175063296694:web:dde5752428732a5977d417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);