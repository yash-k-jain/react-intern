// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL2D5crA_BulWcCpD3NImMpx8BZsi9OMs",
  authDomain: "students-81e43.firebaseapp.com",
  projectId: "students-81e43",
  storageBucket: "students-81e43.firebasestorage.app",
  messagingSenderId: "76368753586",
  appId: "1:76368753586:web:a331527ef8ad7640816aab",
  measurementId: "G-GMQVEK594P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app