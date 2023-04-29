import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button, Typography } from '@mui/material';
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
marginBottom:'.5em'

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

function Login({ onLogin }) {
const classes = useStyles();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate('')

useEffect(() => {
    // if there is a cookie with laravel session that means we are logged in 
    // and it should redirect to home page
    if (Cookies.get('laravel_session')){
        navigate('/');
    }
}, [])

const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const response = await axios.get('http://localhost/sanctum/csrf-cookie', {
            withCredentials: true,
        });
        
        await axios.post('/login', {
            'password' : password,
            'email': email
        }, {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept':"application/json",
                'Access-Control-Allow-Origin' : '*'  
            },
            withCredentials: true
        });

        navigate('/');
        
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }

};

return (
    <>
        <Navbar />
        
        <div className={classes.form}>
        <Typography variant="h4" gutterBottom align='center' fontFamily='Roboto '>
          Login
        </Typography>
            <form onSubmit={handleSubmit}>
                <CustomTextField
                    className={classes.textField}
                    label="Email"
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    marginBottom = {classes.textField}          
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
};

export default Login;
