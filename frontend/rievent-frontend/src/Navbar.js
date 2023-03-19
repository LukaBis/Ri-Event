import React, { useState } from 'react';
import './Navbar.css';

function LoginForm({ onLogin }) {
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

function HomeContent() {
  return (
    <div className='Home-content'>
      <h1>Welcome to My Website</h1>
      <p>This is the home page.</p>
    </div>
  );
}

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showHomeContent, setShowHomeContent] = useState(true);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowHomeContent(false);
  };

  const handleLogin = () => {
    setShowLoginForm(false);
    setShowHomeContent(false);
  };

  const handleHomeClick = () => {
    setShowLoginForm(false);
    setShowHomeContent(true);
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" onClick={handleHomeClick}>Home</a>
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
      {showLoginForm && <LoginForm onLogin={handleLogin} />}
      {showHomeContent && <HomeContent />}
    </div>
  );
}

export default App;
