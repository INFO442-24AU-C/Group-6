import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-background bg-body-tertiary navbar-custom">
      <Container>
        <Navbar.Brand className="navbar-logo">
          <img src="/favicon.ico" alt="favicon" className="navbar-favicon" />
          PNW Connects
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/myevent" className="nav-link">My Event</Nav.Link>
            <Nav.Link as={Link} to="/explore" className="nav-link">Explore</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;   