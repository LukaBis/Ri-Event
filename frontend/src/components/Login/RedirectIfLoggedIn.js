import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function checkLoggedIn () {
  if (Cookies.get('XSRF-TOKEN')) {
    return true;
  }
  return false;
};

function RedirectIfLoggedIn({ }) {
  const navigate = useNavigate();

  useEffect(() => {
   const isLoggedin = checkLoggedIn();
   if(isLoggedin === true){
    navigate('/')
   }
  }, [navigate]);

  return null; 
}

export default RedirectIfLoggedIn;
