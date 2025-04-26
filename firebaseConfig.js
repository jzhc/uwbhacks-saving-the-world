// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiTmAmCNd_4OGSrF828wDaJ2EntH7kdI4",
  authDomain: "billmaster-5be02.firebaseapp.com",
  projectId: "billmaster-5be02",
  storageBucket: "billmaster-5be02.firebasestorage.app",
  messagingSenderId: "1072321899775",
  appId: "1:1072321899775:web:46d27354b406ce3b02f0ca",
  measurementId: "G-CSP36FPHMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);