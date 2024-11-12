import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../index";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            console.log('Account created successfully');
            setSuccess(true);
        } catch (error) {
            console.error('Failed to create an account:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Account created successfully!</p>}
        </div>
    );
};

export default SignUp;