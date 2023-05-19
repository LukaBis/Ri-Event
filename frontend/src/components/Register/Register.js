import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Typography, Button } from '@mui/material';
import CustomTextField from '../../styles/CustomTextField.js';
import useStyles from './useStyles';
import HandleSubmit from './HandleSubmit';

const Register = () => {
  const classes = useStyles();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar />
      <div className={classes.form}>
        <Typography variant="h4" gutterBottom align='center' fontFamily='Roboto '>
          Register
        </Typography>
        <form onSubmit={(event) => {
          event.preventDefault();
          HandleSubmit(event,fullName,password, email, confirmPassword);
          }}>
          <CustomTextField
            className={classes.textField}
            label="Full Name"
            variant="outlined"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            marginbottom={classes.textField}
          />
          <CustomTextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{ marginbottom: '0px' }}
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
          <CustomTextField
            className={classes.textField}
            label="Confirm Password"
            variant="outlined"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
        <Typography variant="subtitle1" align='center'>
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </div>
    </>
  );
};

export default Register;