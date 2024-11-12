import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Initialize Auth and export it
export const auth = getAuth(app);