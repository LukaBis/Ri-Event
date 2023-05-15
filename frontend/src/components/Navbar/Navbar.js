import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
            <Link to='/homepage'>Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/register'>Register</Link>
            </li>
            <li className="nav-item">
            <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}


export default Navbar;
