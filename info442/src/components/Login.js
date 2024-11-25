import React, { useState } from 'react';
import SignIn from './Signin'; 
import SignUp from './Signup'; 

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  

  const toggleSignInSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="login-container">
      {isSigningUp ? (
        <>
          <SignUp />
          <p>
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
  );
};

export default Login;



/*import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../index';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider } from 'firebase/auth';

function Login(props) {
  const { currentUser } = props;
  const [uiConfig, setUiConfig] = useState(null);

  useEffect(() => {
    const configObj = {
      signInOptions: [
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
        }
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
      credentialHelper: 'none',
    };
    setUiConfig(configObj);
  }, []);

  if (currentUser?.userId) {
    return <Navigate to="/myevent" />;
  }

  return (
    <div className="card bg-light mx-auto">
      <div className="container card-body">
        <h1 className="text-center fs-2 fw-bolder">Sign In Here:</h1>
        {uiConfig && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
      </div>
    </div>
  );
}

export default Login;*/

