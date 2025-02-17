import React from "react";
import { initializeApp } from "firebase/app";
 
 import { getDatabase, ref, get , set} from "firebase/database"; // Realtime Database imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider, // Add this
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  
} from "firebase/auth";

 const firebaseConfig = {
   apiKey: "AIzaSyCA74jVzji_5c-o9QNpmATvWwp8Kk-eCDM",
   authDomain: "ws-survey-636f2.firebaseapp.com",
   projectId: "ws-survey-636f2",
   storageBucket: "ws-survey-636f2.firebasestorage.app",
   messagingSenderId: "71401516122",
   appId: "1:71401516122:web:61ab3658be6c3a32303c63",
 };

 const firebaseApp = initializeApp(firebaseConfig);
 const database = getDatabase(firebaseApp);

export {
  database,
  ref,
  get,
  set,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
};