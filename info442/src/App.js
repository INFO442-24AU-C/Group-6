import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './page/Navigation';
import Home from './page/Home';
import MyEvent from './page/Myevent';
import Login from './page/Login'; 
import AuthDetails from './components/AuthDetails';
import Profile from './page/Profile'

function App() {
  return (
    <Router>
      <Navigation />
      <AuthDetails />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myevent" element={<MyEvent />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
