import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useProfileImage from './useProfileImage';
import uploadProfileImage from '../../requests/put/uploadProfileImage';
import Alert from '@mui/material/Alert';

function ProfileImage() {

    let profileImage = useProfileImage();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUploadedFile(selectedFile);
    };

    const handleFileUpload = () => {
        uploadProfileImage(uploadedFile)
        .then(res => {
            setSuccessAlert(res.message);
            setErrorAlert(null);
        })
        .catch(err => {
            setErrorAlert(err.message);
            setSuccessAlert(false);
        })
    };        

    return (
        <>
            <Box sx={{ m: 10 }}>
                <Typography variant='h3' sx={{ mb: 5 }}>
                    Profile Image
                </Typography>
                {
                    uploadedFile ? (
                        <img
                            src={URL.createObjectURL(uploadedFile)}
                            style={{
                                borderRadius: '50%',
                                height: 'auto',
                                width: '280px',
                                marginBottom: '4rem',
                            }}
                        />
                    ) : (
                        <img
                            src={profileImage?.url}
                            style={{
                                borderRadius: '50%',
                                height: 'auto',
                                width: '280px',
                                marginBottom: '4rem',
                            }}
                        />
                    )
                }
                <label>Upload new profile image</label>
                <input type='file' onChange={handleFileChange} /> <br />
                <Button 
                    variant="outlined"
                    onClick={handleFileUpload}
                    sx={{ mt: 4 }}>
                        Update
                </Button>

                {successAlert ? (
                    <Alert severity="success" sx={{ mt: 4 }}>
                        Successful update!
                    </Alert>
                ) : null}

                {errorAlert ? (
                    <Alert severity="error" sx={{ mt: 4 }}>
                        {errorAlert}
                    </Alert>
                ) : null}
            </Box>
        </>
    )
}

export default ProfileImage;