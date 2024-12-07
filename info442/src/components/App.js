import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import MyEvent from './Myevent';
import Login from './Login';
import AuthDetails from './AuthDetails';
import Profile from './Profile';
import Footer from './Footer'; 
import ExploreEvent from './ExploreEvent';
import Notification from './Notification';
import { auth } from '../index';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // State to track the logged-in user
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // Set user if signed in or null if signed out
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navigation />
      <AuthDetails />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Conditional routes based on user sign-in status */}
        <Route
          path="/myevent"
          element={authUser ? <MyEvent /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="/explore" element={<ExploreEvent />} />
        
        <Route path="/login" element={<Login />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;


