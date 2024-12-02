import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, database } from "../index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [socialmedia, setSocialMedia] = useState("");
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
            setFile(data.photoURL);
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
    <div className="home">
    <Container className="py-5">
        <Row className="g-4 align-items-start">
            <Col className="mx-auto">
            <h1 className="text-center text-dark mb-4">Edit Profile</h1>
            <Form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm h-100">
                <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Pronoun</Form.Label>
                <Form.Control
                    type="text"
                    value={pronoun}
                    onChange={(e) => setPronoun(e.target.value)}
                    placeholder="Pronouns"
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Social Media Link</Form.Label>
                <Form.Control
                    type="text"
                    value={socialmedia}
                    onChange={(e) => setSocialMedia(e.target.value)}
                    placeholder="Social Media Link"
                />
                </Form.Group>
                <Form.Group className="mb-4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100">
                Save Profile
                </Button>
            </Form>
            </Col>

            {userData && (
            <Col className="mx-auto">
                <h1 className="text-center text-dark mb-4">Profile</h1>
                <div className="p-4 border rounded bg-light shadow-sm h-100">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Pronoun:</strong> {userData.pronoun}</p>
                <p><strong>Social Media:</strong> {userData.socialmedia}</p>
                {file && (
                    <div className="text-center">
                    <img
                        src={file}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "150px", margin: "20px 0" }}
                    />
                    </div>
                )}
                </div>
            </Col>
            )}
        </Row>
    </Container>
    </div>
  );
};

export default Profile;



