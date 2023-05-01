import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles';

function Profile() {

    const [disabled, setDisabled] = useState({
        name: true,
        email: true
    });

    const handleDisableToggle = (field) => {
        setDisabled((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                    Profile Details
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        disabled={disabled.name}
                        label="First name"
                        id="standard-size-normal"
                        defaultValue="My Name"
                        variant="standard"
                        sx={styles.profileField}
                    />
                    
                    {disabled.name ? (
                        <Button
                            variant="text"
                            onClick={() => handleDisableToggle("name")}
                        >
                            Edit
                        </Button>
                    ) : (
                        <CloseIcon
                            sx={{ ml: 3, mb: 1, cursor: 'pointer' }}
                            onClick={() => handleDisableToggle('name')}
                        />
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Profile