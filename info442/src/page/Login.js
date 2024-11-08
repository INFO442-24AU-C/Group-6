import React, { useState, useEffect } from 'react';
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

export default Login;

