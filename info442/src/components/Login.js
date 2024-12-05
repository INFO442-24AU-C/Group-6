import React, { useState, useEffect } from 'react';
import { auth } from '../index'; 
import SignIn from './Signin'; 
import SignUp from './Signup'; 
import { onAuthStateChanged } from 'firebase/auth';

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => unsubscribe(); 
  }, []);

  const toggleSignInSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  if (isUserLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-message">
          <p>You are logged in!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="form-container">
      {isSigningUp ? (
        <>
          <SignUp />
          <p className="toggle-signin-signup">
            Already have an account?{' '}
            <button onClick={toggleSignInSignUp}>Sign In</button>
          </p>
        </>
      ) : (
        <>
          <SignIn />
          <p>
            Need an account?{' '}
            <button onClick={toggleSignInSignUp}>Sign Up</button>
          </p>
        </>
      )}
      </div>
    </div>
  );
};

export default Login;





