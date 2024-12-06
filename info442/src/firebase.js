// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE5JhYedJk5QP5LX-Hn2s4ZYuMZyNSpVY",
  authDomain: "pnw-connect.firebaseapp.com",
  projectId: "pnw-connect",
  storageBucket: "pnw-connect.firebasestorage.app",
  messagingSenderId: "921966180003",
  appId: "1:921966180003:web:f98cf3555757b9d4353116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };