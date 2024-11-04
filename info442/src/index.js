import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE5JhYedJk5QP5LX-Hn2s4ZYuMZyNSpVY",
  authDomain: "pnw-connect.firebaseapp.com",
  projectId: "pnw-connect",
  storageBucket: "pnw-connect.appspot.com",
  messagingSenderId: "921966180003",
  appId: "1:921966180003:web:f98cf3555757b9d4353116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

