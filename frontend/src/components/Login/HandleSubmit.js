import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const HandleSubmit = async (password, email, onLogin, navigate, setLoading) => {
  try {
    const response = await axios.get('http://localhost/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    const loginResponse = await axios.post('/login', {
      password: password,
      email: email
    }, {
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });

    const loginData = loginResponse.data;

    if (onLogin && typeof onLogin === 'function') {
      onLogin(loginData);
    }

    navigate('/');

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

export default HandleSubmit;
