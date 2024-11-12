// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };