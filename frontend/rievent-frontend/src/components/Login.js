import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate('')

    useEffect(() => {
        // if there is a cookie with laravel session that means we are logged in 
        // and it should redirect to home page
        if (Cookies.get('laravel_session')){
            navigate('/');
        }
    }, [])

    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get('http://localhost/sanctum/csrf-cookie', {
                withCredentials: true,
            });
            
            await axios.post('/login', {
                'password' : password,
                'email': email
            }, {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept':"application/json",
                    'Access-Control-Allow-Origin' : '*'  
                },
                withCredentials: true
            });

            navigate('/');
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <Navbar />
            <div className='Login-div'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </label>
                    {loading ? <BeatLoader /> : <button type="submit">Login</button>}
                </form>
            </div>
        </>
    );
}

export default Login;
