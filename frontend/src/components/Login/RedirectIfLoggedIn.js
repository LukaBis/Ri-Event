import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RedirectIfLoggedIn({ }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (Cookies.get('XSRF-TOKEN')) {
        navigate('/');
      }
    };

    checkLoggedIn();
  }, [navigate]);

  return null; // Since this component doesn't render anything, return null
}

export default RedirectIfLoggedIn;
