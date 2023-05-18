import React, { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Typography } from '@mui/material';
import CustomTextField from '../../styles/CustomTextField.js';
import useStyles from '../../styles/UseStyles';
import HandleSubmit from './HandleSubmit';
import RedirectIfLoggedIn from './RedirectIfLoggedIn';

function Login({ onLogin }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  

  

  return (
    <>
      <RedirectIfLoggedIn/>
      <Navbar />

      <div className={classes.form}>
        <Typography variant="h4" gutterBottom align='center' fontFamily='Roboto '>
          Login
        </Typography>
        <form onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          HandleSubmit(password, email, onLogin, navigate, setLoading);
          }}>
          <CustomTextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            marginbottom={classes.textField}
          />
          <CustomTextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            {loading ? <BeatLoader size={10} color={'#ffffff'} /> : 'Log in'}
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
