import React from 'react';
import Navbar from '../Navbar';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className='Home'>
      
      <div className='Home-content'>
        <h1>Welcome to RiEvent</h1>
        <p>This is the home page blabla.</p>
      </div>
      <div className='Home-sidebar'>
        <ul>
          <li>
            <a href='/myprofile'>My Profile</a>
          </li>
          <li>
            <a href='/myevents'>My Events</a>
          </li>
          <li>
            <a href='/options'>Options</a>
          </li>
          <li>
            <a href='/connections'>Connections</a>
          </li>
          <li>
            <a href='/logout'>Logout</a>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Home;
