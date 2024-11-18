import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-background bg-body-tertiary">
      <Container>
        <Navbar.Brand className="bg-dark text-white fs-1 rounded">PNW Connects</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="bg-dark text-white rounded px-3 py-2 mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/myevent" className="bg-dark text-white rounded px-3 py-2 mx-3">My Event</Nav.Link>
            <Nav.Link as={Link} to="/profile" className="bg-dark text-white rounded px-3 py-2 mx-3">Profile</Nav.Link>
            <Nav.Link as={Link} to="/login" className="bg-dark text-white rounded px-3 py-2 mx-3">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;   