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

function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit form data to server
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <label htmlFor="birthdate">Date of Birth</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={birthdate}
          onChange={(event) => setBirthdate(event.target.value)}
        />

        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Register</button>
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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowHomeContent(false);
    setShowRegistrationForm(false)
  };

  const handleLogin = () => {
    setShowLoginForm(false);
    setShowHomeContent(false);
    setShowRegistrationForm(false)
  };

  const handleRegistration = () => {
    setShowLoginForm(false);
    setShowHomeContent(false);
    setShowRegistrationForm(false)
  }

  const handleRegisterClick = () => {
    setShowLoginForm(false);
    setShowHomeContent(false);
    setShowRegistrationForm(true)
  }

  const handleHomeClick = () => {
    setShowLoginForm(false);
    setShowHomeContent(true);
    setShowRegistrationForm(false);
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
              <a href="#" onClick={handleRegisterClick}>Register</a>
            </li>
            <li className="nav-item">
              <a href="#" onClick={handleLoginClick}>Login</a>
            </li>
          </ul>
        </nav>
      </header>
      {showLoginForm && <LoginForm onLogin={handleLogin} />}
      {showHomeContent && <HomeContent />}
      {showRegistrationForm && <RegistrationForm onRegistration={handleRegistration}/>}
    </div>
  );
}

export default App;
