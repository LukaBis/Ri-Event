import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Submitting login form with username ${username} and password ${password}`);
      onLogin();
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
export default Login
