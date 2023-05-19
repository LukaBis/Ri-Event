import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const HandleSubmit = async (event,fullName, password, email, confirmPassword) => {
    event.preventDefault();
    const navigate = useNavigate();
    try {
      // Fetch CSRF token
      const response = await axios.get('http://localhost/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      // Submit form data to server
      await axios.post(
        '/register',
        {
          name: fullName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  export default HandleSubmit;