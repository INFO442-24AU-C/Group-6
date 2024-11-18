import React, { useState, useEffect } from 'react';
import { auth, storage, database } from '../index'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Profile.css';
import Profiledata from '../components/Profiledata'; 
import { Form, Button, Alert } from 'react-bootstrap';

const Profile = () => {
    const [name, setName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [socialMedia, setSocialMedia] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [profileUpdated, setProfileUpdated] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            const docRef = doc(database, "users", auth.currentUser.uid);
            getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name);
                    setPronouns(data.pronouns);
                    setSocialMedia(data.socialMedia);
                }
            }).catch(error => {
                console.error("Error fetching profile:", error);
                setError(error.message);
            });
        }
    }, []);

    const handleSaveProfile = async () => {
        setLoading(true);
        setError('');
        try {
            let photoURL = profilePic ? await uploadProfilePicture(profilePic) : null;
            const userProfile = {
                name,
                pronouns,
                socialMedia,
                ...(photoURL && { photoURL })
            };
            const docRef = doc(database, "users", auth.currentUser.uid);
            await setDoc(docRef, userProfile);
            setProfileUpdated(true);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.message);
        }
        setLoading(false);
    };

    const uploadProfilePicture = async (file) => {
        const filePath = `profilePics/${auth.currentUser.uid}/profilePic.jpg`;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    if (profileUpdated) {
        return <Profiledata />;
    }

    return (

        <div>
            <h2 className="mt-4">Edit Profile</h2>
            <div className="container">
                <Form >
                    {/* Name Field */}
                    <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    </Form.Group>

                    {/* Pronouns Field */}
                    <Form.Group controlId="formPronouns" className="mb-3">
                    <Form.Label>Pronouns</Form.Label>
                    <Form.Control
                        type="text"
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        placeholder="Enter your pronouns"
                        required
                    />
                    </Form.Group>

                    {/* Social Media Link */}
                    <Form.Group controlId="formSocialMedia" className="mb-3">
                    <Form.Label>Social Media Link</Form.Label>
                    <Form.Control
                        type="text"
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                        placeholder="Enter your social media link"
                        required
                    />
                    </Form.Group>

                    {/* Profile Picture Upload */}
                    <Form.Group controlId="formProfilePic" className="mb-3">
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                    </Form.Group>

                    {/* Save Button */}
                    <Button
                    variant="dark"
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="w-100 mb-3"
                    >
                    {loading ? 'Saving...' : 'Save Profile'}
                    </Button>

                    {/* Error Message */}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Form>
            </div>
        </div>

        // <div className="profile-edit-container">
        //     <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        //     <input type="text" value={pronouns} onChange={e => setPronouns(e.target.value)} placeholder="Pronouns" />
        //     <input type="text" value={socialMedia} onChange={e => setSocialMedia(e.target.value)} placeholder="Social Media Link" />
        //     <input type="file" onChange={e => setProfilePic(e.target.files[0])} />
        //     <button onClick={handleSaveProfile} disabled={loading}>Save Profile</button>
        //     {error && <p className="error">{error}</p>}
        // </div>
    );
};

export default Profile;

