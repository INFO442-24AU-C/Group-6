import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import MyEvent from './Myevent';
import Login from './Login'; 
import AuthDetails from './AuthDetails';
import Profile from './Profile';
import Footer from './Footer'; 
import ExploreEvent from './ExploreEvent';

function App() {
  return (
    <Router>
      <Navigation />
      <AuthDetails />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myevent" element={<MyEvent />} />
        <Route path="/explore" element={<ExploreEvent />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <Footer />
    </Router>
    
  );
}

export default App;
