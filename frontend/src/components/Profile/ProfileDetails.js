import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles';
import updateUserInfo from '../../requests/put/updateUserInfo';
import getUserData from '../../requests/get/getUserData';
import Alert from '@mui/material/Alert';

function ProfileDetails() {
  const [disabled, setDisabled] = useState({
    name: true,
    email: true,
    disabledToUpdate: true,
  });

  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    // get user data on first render
    getUserData().then((user) => {
      setUserData({
        name: user.name,
        email: user.email,
      });
    });
  }, []);

  const handleDisableToggle = (field) => {
    setDisabled((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));

    // once user clicked edit button it means user wants to edit something
    // and update button should be enabled
    setDisabled((prevState) => ({
      ...prevState,
      disabledToUpdate: false,
    }));
  };

  const handleSubmit = () => {
    updateUserInfo(userData.name, userData.email)
      .then((updatedUser) => {
        setSuccessAlert(true);
        setDisabled({
          name: true,
          email: true,
          disabledToUpdate: true,
        });
        setErrorAlert(null);
      })
      .catch((err) => {
        setErrorAlert(err.message);
        setSuccessAlert(false);
      });
  };

  return (
    <>
      <Box sx={{ m: 10 }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Profile Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              disabled={disabled.name}
              label="First name"
              id="standard-size-normal"
              value={userData.name}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  name: event.target.value,
                })
              }
              variant="standard"
              sx={styles.profileField}
            />

            {disabled.name ? (
              <Button
                variant="text"
                onClick={() => handleDisableToggle('name')}
              >
                Edit
              </Button>
            ) : (
              <CloseIcon
                sx={{ ml: 3, mb: 1, cursor: 'pointer' }}
                onClick={() => handleDisableToggle('name')}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              disabled={disabled.email}
              label="Email"
              id="standard-size-normal"
              value={userData.email}
              onChange={(event) =>
                setUserData({
                  ...userData,
                  email: event.target.value,
                })
              }
              variant="standard"
              sx={styles.profileField}
            />

            {disabled.email ? (
              <Button
                variant="text"
                onClick={() => handleDisableToggle('email')}
              >
                Edit
              </Button>
            ) : (
              <CloseIcon
                sx={{ ml: 3, mb: 1, cursor: 'pointer' }}
                onClick={() => handleDisableToggle('email')}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              sx={{ mt: 4 }}
              onClick={handleSubmit}
              disabled={disabled.disabledToUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>

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
  );
}

export default ProfileDetails;