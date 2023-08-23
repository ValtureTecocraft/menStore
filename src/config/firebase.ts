// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg_OyqMeUDLk15G2D8EDrBDJ67PIwHikc",
  authDomain: "todo-app-26282.firebaseapp.com",
  projectId: "todo-app-26282",
  storageBucket: "todo-app-26282.appspot.com",
  messagingSenderId: "816360157092",
  appId: "1:816360157092:web:7be84335f03b47980c1b31",
  measurementId: "G-2TDBJWDZLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
