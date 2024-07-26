// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkIPKtfQoKPr05J0RZ3nGWokhzqiERNiQ",
  authDomain: "smarthome-74267.firebaseapp.com",
  projectId: "smarthome-74267",
  storageBucket: "smarthome-74267.appspot.com",
  messagingSenderId: "312988420620",
  appId: "1:312988420620:web:e2db5ee010a97642f8fc29",
  measurementId: "G-CEJFRNMFXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
