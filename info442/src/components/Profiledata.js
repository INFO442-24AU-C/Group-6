import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database, auth } from '../index'; 

const Profiledata = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      if (auth.currentUser) {
        const docRef = doc(database, 'users', auth.currentUser.uid);
        getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }).catch(error => {
          console.error("Error getting document:", error);
        });
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-pic" style={{ backgroundImage: `url(${profile.photoURL})` }}></div>
      <div className="profile-info">
        <h2>{profile.name} {profile.pronouns ? `(${profile.pronouns})` : ''}</h2>
        {profile.socialMedia && <a href={profile.socialMedia} target="_blank" rel="noopener noreferrer">Social Media</a>}
        <button className="edit-profile-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profiledata;
