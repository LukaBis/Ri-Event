import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let token
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [csrfToken, setCsrfToken] = useState('');
  
  
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
         token = await axios.get('/sanctum/csrf-cookie', {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
         
        });
        console.log('CSRF token received!');
        console.log(token)
      } catch (error) {
        console.error(error);
      }
    };
    
    getCsrfToken();
  }, []);
  

  const handleSubmit = async (event) => {
    console.log(token)
    event.preventDefault();
    try {
      await axios.post('https://localhost/login', {
        username,
        password,
      }, {
        headers: {
          'X-CSRF-TOKEN': token,
          'Access-Control-Allow-Origin': '*',
        },
      });
      console.log('Login successful!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Login-div'>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
