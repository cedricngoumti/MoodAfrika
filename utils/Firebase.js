// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB7GuorDiXfMH4yqtmmBD7cqKcjYu3RCA",
  authDomain: "mood-cbaed.firebaseapp.com",
  projectId: "mood-cbaed",
  storageBucket: "mood-cbaed.appspot.com",
  messagingSenderId: "580757482960",
  appId: "1:580757482960:web:5a3185aa06c6409fcc1dd5",
  measurementId: "G-SQXTRZBY9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const createUser = createUserWithEmailAndPassword;
//const provider = new GoogleAuthProvider();


export {auth };
