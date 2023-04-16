import React, { useState, useEffect } from 'react';
import { json, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;




function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate('')
  
  useEffect(() => {
    if(localStorage.getItem('XSRF-TOKEN') != "undefined" && localStorage.getItem('XSRF-TOKEN') != null ){
      Navigate('/')
    }

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      setCsrfToken(response.data.csrfToken);
      console.log('CSRF token received:', response.config.headers["X-XSRF-TOKEN"]);
       await axios.post('/login', {
       'username' : 'Alvina Buckridge',
       'password' : 'password',
       'email': 'kristopher50@example.net'
       
     }, {
         headers: {
           'X-XSRF-TOKEN': response.config.headers["X-XSRF-TOKEN"],
           'Accept':"application/json",
           'Access-Control-Allow-Origin' : '*'

         },
         withCredentials: true,
       });
      console.log(response.config.headers["X-XSRF-TOKEN"]);
      localStorage.setItem('XSRF-TOKEN',response.config.headers["X-XSRF-TOKEN"])
      Navigate('/')
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <><Navbar /><div className='Login-div'>
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
    </div></>
  );
}

export default Login;
