import React from 'react';
import { Box, Typography } from '@mui/material';

function ProfileImage() {
    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 3 }}>
                    Profile Image
                </Typography>
                <label>Upload new profile image</label>
                <input type='file' />
            </Box>
        </>
    )
}

export default ProfileImage;