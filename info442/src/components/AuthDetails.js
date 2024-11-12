import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../index";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user); // User is signed in
        } else {
          setAuthUser(null); // User is signed out
        }
      });
  
      return () => unsubscribe(); 
    }, []);
  
    const userSignOut = () => {
      signOut(auth).then(() => {
        console.log("Sign out successful");
      }).catch((error) => {
        console.log("Sign out failed", error);
      });
    };
  
    return (
      <div>
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    );
  };
  
  export default AuthDetails;
  