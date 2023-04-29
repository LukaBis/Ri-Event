import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../Navbar';
import { Typography, Button } from '@mui/material';
import { makeStyles, styled, useTheme } from '@mui/styles';
import { TextField } from '@mui/material/';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      textAlign: 'center'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2%',
    
  },
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: '0 auto',
    marginTop:'2em',
    marginBottom:'3.5em'

  },
  textField: {
    marginBottom: 0,
    maxHeight: 1400,
    paddingBottom: 0
  },
  submitButton: {
    margin: 10,
  },
}));

const Register = () => {
  const classes = useStyles();
 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      //history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.form}>
        <Typography variant="h4" gutterBottom align='center' fontFamily='Roboto '>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            className={classes.textField}
            label="Full Name"
            variant="outlined"  
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)} 
            marginBottom = {classes.textField}          
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
            sx={{ marginBottom: '0px' }}
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
