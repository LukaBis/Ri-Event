import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useProfileImage from './useProfileImage';
import uploadProfileImage from '../../requests/put/uploadProfileImage';

function ProfileImage() {

    const profileImage = useProfileImage();
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUploadedFile(selectedFile);
    };

    const handleFileUpload = () => {
        uploadProfileImage(uploadedFile).then(msg => {
            console.log(msg)
        });
    };

    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 5 }}>
                    Profile Image
                </Typography>
                <img
                    src={profileImage?.url}
                    style={{
                        borderRadius: '50%',
                        height: 'auto',
                        width: '280px',
                        marginBottom: '4rem',
                    }}
                />
                <label>Upload new profile image</label>
                <input type='file' onChange={handleFileChange} /> <br />
                <Button 
                    variant="outlined"
                    onClick={handleFileUpload}
                    sx={{ mt: 4 }}>
                        Update
                </Button>
            </Box>
        </>
    )
}

export default ProfileImage;