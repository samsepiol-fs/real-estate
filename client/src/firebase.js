// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b89e1.firebaseapp.com",
  projectId: "mern-estate-b89e1",
  storageBucket: "mern-estate-b89e1.appspot.com",
  messagingSenderId: "1051660239156",
  appId: "1:1051660239156:web:52a818e42bd5013a67a561"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);