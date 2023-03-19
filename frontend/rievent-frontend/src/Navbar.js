import React, { useState } from 'react';
import './Navbar.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting login form with username ${username} and password ${password}`);
  };
  const a = document.getElementsByClassName("Login-div")
  

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
function HomeClick(){
   const a = document.getElementsByClassName("Login-div")
   a[0].style.display = "none"

   
}

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" onClick={HomeClick}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#">Register</a>
            </li>
            <li className="nav-item">
              <a href="#" onClick={handleLoginClick}>Login</a>
            </li>
          </ul>
        </nav>
      </header>
      {showLoginForm && <LoginForm />}
    </div>
  );
}

export default App;
