import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles';
import Alert from '@mui/material/Alert';
import updatePassword from '../../requests/put/updatePassword';

function PasswordUpdate() {

    const [passwordInput, setPasswordInput] = useState({
        currentPass: "",
        newPass: "",
        newPassConfirmation: "",
    });

    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);

    const handleSubmit = () => {
        updatePassword(
            passwordInput.currentPass,
            passwordInput.newPass,
            passwordInput.newPassConfirmation
        ).then(res => {
            if(res == "OK") {
                setPasswordInput({
                    currentPass: "",
                    newPass: "",
                    newPassConfirmation: "",
                });

                setSuccessAlert(true);
                setErrorAlert(null);
            }
        }).catch(err => {
            setErrorAlert(err.message);
            setSuccessAlert(false);
        });
    }

    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                    Password Update
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="Current Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        value={passwordInput.currentPass}
                        onChange={(event) => setPasswordInput({
                            ...passwordInput,
                            currentPass: event.target.value
                        })}
                        sx={styles.profileField}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="New Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        value={passwordInput.newPass}
                        onChange={(event) => setPasswordInput({
                            ...passwordInput,
                            newPass: event.target.value
                        })}
                        sx={styles.profileField}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="New Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        value={passwordInput.newPassConfirmation}
                        onChange={(event) => setPasswordInput({
                            ...passwordInput,
                            newPassConfirmation: event.target.value
                        })}
                        sx={styles.profileField}
                    />
                </Box>

                <Button 
                    onClick={handleSubmit}
                    variant="outlined"
                    sx={{ mt: 4 }}>
                        Update
                </Button>

                {successAlert ? (
                    <Alert severity="success" sx={{ mt: 4 }} style={styles.alert}>
                        Successful update!
                    </Alert>
                ) : null}

                {errorAlert ? (
                    <Alert severity="error" sx={{ mt: 4 }} style={styles.alert}>
                        {errorAlert}
                    </Alert>
                ) : null}
            </Box>
        </>
    )
}

export default PasswordUpdate