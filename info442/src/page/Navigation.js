import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 

function Navigation() {
  return (
    <div className="navbar-container"> 
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/myevent">MyEvent</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}
export default Navigation;   