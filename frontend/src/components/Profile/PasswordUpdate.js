import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles';
import Alert from '@mui/material/Alert';

function PasswordUpdate() {
    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                    Password Update
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="Current Password"
                        // defaultValue="Current Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        sx={styles.profileField}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="New Password"
                        defaultValue="New Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        sx={styles.profileField}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        label="New Password"
                        defaultValue="New Password"
                        id="standard-size-normal"
                        variant="standard"
                        type='password'
                        sx={styles.profileField}
                    />
                </Box>

                <Button 
                    variant="outlined"
                    sx={{ mt: 4 }}>
                        Update
                </Button>

                {/* {successAlert ? (
                    <Alert severity="success" sx={{ mt: 4 }} style={styles.alert}>
                        Successful update!
                    </Alert>
                ) : null}

                {errorAlert ? (
                    <Alert severity="error" sx={{ mt: 4 }} style={styles.alert}>
                        {errorAlert}
                    </Alert>
                ) : null} */}
            </Box>
        </>
    )
}

export default PasswordUpdate