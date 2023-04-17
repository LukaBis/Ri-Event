import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Cookies from 'js-cookie';
import '../styles/Home.css';


const Home = () => {
  
  const navigate = useNavigate('')

  const handleLogout = async () => {
  
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json",
                'Referer':'localhost:3000'
            },
        });

        if (!response.ok) {
            throw new Error('Logout request failed');
        }

        Cookies.remove('laravel_session');
        Cookies.remove('XSRF-TOKEN');

        navigate('/login');
     
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    if (!Cookies.get('XSRF-TOKEN')) {
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
            <a href='/organisations'>Organisations</a>
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
