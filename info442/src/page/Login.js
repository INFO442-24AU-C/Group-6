import React from 'react';
import { Navigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


export default function Login(props) {
  const currentUser = props.currentUser;

  const auth = getAuth();

  const configObj = {
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      }
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => false 
    },
    credentialHelper: 'none'
  }

  return (
    <div className="card bg-light mx-auto">
      <div className="container card-body">
        <h1 className="text-center fs-2 fw-bolder">Sign In Here:</h1>
        <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
      </div>
    </div>
  )
}
