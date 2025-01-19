// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { defineNuxtPlugin } from '#app'
import { getFirestore } from "firebase/firestore";

// Define the Firebase configuration type
interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string; // Optional because measurementId is not always required
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyDtUnFb1eGonvuAheC__DtgtGZO3mw7B_Y",
    authDomain: "nb-clone-web.firebaseapp.com",
    projectId: "nb-clone-web",
    storageBucket: "nb-clone-web.firebasestorage.app",
    messagingSenderId: "323275255336",
    appId: "1:323275255336:web:d16172c2e4efcdf9f48f1d",
    measurementId: "G-CHDREEKP8C",
};

const app = initializeApp(firebaseConfig);
const analytics: Analytics | null = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const firestore = getFirestore(app);

export default defineNuxtPlugin(() => {
    return {
        provide:{
            auth: () => auth,
            analytics: () => analytics,
            firestore: () => firestore,
        }
    }
})
export {  analytics, firestore };