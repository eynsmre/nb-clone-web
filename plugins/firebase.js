import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtUnFb1eGonvuAheC__DtgtGZO3mw7B_Y",
  authDomain: "nb-clone-web.firebaseapp.com",
  projectId: "nb-clone-web",
  storageBucket: "nb-clone-web.appspot.com",
  messagingSenderId: "323275255336",
  appId: "1:323275255336:web:d16172c2e4efcdf9f48f1d",
  measurementId: "G-CHDREEKP8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
