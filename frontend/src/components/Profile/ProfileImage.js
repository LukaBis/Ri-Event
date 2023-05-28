import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useProfileImage from './useProfileImage';
import uploadProfileImage from '../../requests/put/uploadProfileImage';
import Alert from '@mui/material/Alert';
import deleteProfileImage from '../../requests/delete/deleteProfileImage';
import Modal from '@mui/material/Modal';
import styles from './styles';

function ProfileImage() {

    let profileImage = useProfileImage();
    const defaultProfileImage = {url: "profile_images/blank-profile-image.jpg"}
    const [uploadedFile, setUploadedFile] = useState(null);
    const [successAlert, setSuccessAlert] = useState(null);
    const [errorAlert, setErrorAlert] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUploadedFile(selectedFile);
    };

    const handleFileDelete = () => {
        setDisabled(true);
        deleteProfileImage()
            .then(res => {
                setSuccessAlert(res.message);
                setErrorAlert(null);

                setUploadedFile(null);
                
                profileImage = defaultProfileImage;
            })
            .catch(err => {
                setErrorAlert(err.message);
                setSuccessAlert(false);
            })
            .finally(() => {
                setModalOpen(false);
                setDisabled(false);
            })
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
                <Modal
                    open={modalOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modal}>
                        <Typography id="modal-modal-title" variant="h6" component="h3">
                            Are you sure you want to delete this image?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setModalOpen(false)}
                                sx={{ mt: 4 }}
                                disabled={disabled}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleFileDelete}
                                sx={{ mt: 4, ml: 2, borderColor: 'red', color: 'red', 
                                '&:hover': {
                                    borderColor: 'red',
                                }, }}
                                disabled={disabled}
                            >
                                Delete
                            </Button>
                        </Typography>
                    </Box>
                </Modal>

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
                <input id='image' type='file' onChange={handleFileChange} /> <br />
                <Button
                    variant="outlined"
                    onClick={handleFileUpload}
                    sx={{ mt: 4 }}>
                    Update
                </Button>
                <br/>
                <Button
                    variant="outlined"
                    onClick={() => setModalOpen(true)}
                    sx={{
                        mt: 2, borderColor: 'red', color: 'red', 
                        '&:hover': {
                            borderColor: 'red',
                        },
                    }}>
                    Delete
                </Button>

                {successAlert ? (
                    <Alert severity="success" sx={{ mt: 4 }}>
                        {successAlert}
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