import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, database } from '../index'; 
import './Profile.css'; 

const Profile = () => {
    const [name, setName] = useState('');
    const [pronoun, setPronoun] = useState('');
    const [socialmedia, setSocialMedia] = useState('');
    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const docRef = doc(database, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    if (data.photoURL) {
                        setFile(data.photoURL); // Load the stored image URL
                    }
                } else {
                    console.log("No user data available");
                }
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (event) => {
        const newFile = URL.createObjectURL(event.target.files[0]);
        setFile(newFile);
        if (auth.currentUser) {
            const docRef = doc(database, "users", auth.currentUser.uid);
            setDoc(docRef, { photoURL: newFile }, { merge: true }); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (auth.currentUser) {
            const docRef = doc(database, "users", auth.currentUser.uid);
            await setDoc(docRef, { name, pronoun, socialmedia }, { merge: true });
            setUserData({ ...userData, name, pronoun, socialmedia, photoURL: file });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                </label>
                <label>
                    Pronoun:
                    <input type="text" value={pronoun} onChange={e => setPronoun(e.target.value)} placeholder="Pronouns" />
                </label>
                <label>
                    SocialMedia:
                    <input type="text" value={socialmedia} onChange={e => setSocialMedia(e.target.value)} placeholder="SocialMedia Link" />
                </label>
                <label>
                    Profile Image:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <button type="submit">Save Profile</button>
            </form>
            {userData && (
                <div className="profile-container">
                    <h1>Profile</h1>
                    <p className="profile-info">Name: {userData.name}</p>
                    <p className="profile-info">Pronoun: {userData.pronoun}</p>
                    <p className="profile-info">SocialMedia: {userData.socialmedia}</p>
                    {file && <img src={file} alt="Profile" className="profile-image" />}
                </div>
            )}
        </div>
    );
};

export default Profile;
