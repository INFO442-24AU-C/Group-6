import React, { useEffect, useState } from 'react';
import { auth } from '../index'; 
import './Login.css';

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); 
  }, []);

  return (
    <div>
      {user ? <p>You are logged in as {user.email}</p> : <p>You are not logged in.</p>}
    </div>
  );
};

export default AuthStatus;
