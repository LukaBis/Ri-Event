import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar/Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Navigate = useNavigate('');

    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Fetch CSRF token
            const response = await axios.get('/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Submit form data to server
            await axios.post('/register', {
                name: fullName,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                }, {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            Navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <><Navbar /><div className="Register-div">
        <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)} />

        <label htmlFor="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)} />

        <button type="submit">Register</button>
        <p>
            <Link to="/login">Already have an account? Log in!</Link>
        </p>
        </form>
    </div></>
    );
};

export default Register;
