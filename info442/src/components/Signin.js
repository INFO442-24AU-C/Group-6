import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../index";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
// import "../page/Login.css"; 

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message); // Set error message on failed login
      });
  };

  return (
    <Container>
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="sign-in-container p-4 border rounded shadow-sm">
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={signIn}>
              {/* Email Field */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Error Message */}
              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

              {/* Submit Button */}
              <Button variant="dark" type="submit" className="w-100" disabled={!email || !password}>
                Log In
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;


