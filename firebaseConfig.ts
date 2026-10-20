// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOs_V2yHsYUkxZkWHsSd3vPULaAQ38qa4",
  authDomain: "osoitekirja-eb32d.firebaseapp.com",
  databaseURL: "https://osoitekirja-eb32d-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "osoitekirja-eb32d",
  storageBucket: "osoitekirja-eb32d.firebasestorage.app",
  messagingSenderId: "311391249154",
  appId: "1:311391249154:web:8f317a61681e8c82cb181b",
  measurementId: "G-D1K47VCVQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
