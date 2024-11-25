import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzdlJFmpS66zyC5-69qqWDpmr1SQi8FA",
  authDomain: "pnw-connects.firebaseapp.com",
  projectId: "pnw-connects",
  storageBucket: "pnw-connects.firebasestorage.app",
  messagingSenderId: "77130043910",
  appId: "1:77130043910:web:c32bb3f2d9433218e42987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app); // Export Firestore
export const storage = getStorage(app); // Export Storage

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

