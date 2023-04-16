import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import '../styles/Home.css';




const Home = () => {
  
  const navigate = useNavigate('')

  const handleLogout = async () => {
  
  
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN').toString(),
          'Accept': "application/json",
          'Referer':'localhost:3000'
        },
        // credentials: 'include',
      });
      if (!response.ok) {
        //console.log(response)
        throw new Error('Logout request failed');
      }
      localStorage.removeItem('XSRF-TOKEN')
      navigate('/login')
     
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  useEffect(() => {
    console.log("hi mom")
    console.log( localStorage.getItem('XSRF-TOKEN'))
    if (localStorage.getItem('XSRF-TOKEN') === "undefined" || localStorage.getItem('XSRF-TOKEN') === null ) {
      navigate('/login')
    }
  }, []);

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
            <button onClick={() => handleLogout()}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
