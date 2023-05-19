import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles';
import Alert from '@mui/material/Alert';
import updatePassword from '../../requests/put/updatePassword';

function PasswordUpdate() {
  const [passwordInput, setPasswordInput] = useState({
    currentPass: '',
    newPass: '',
    newPassConfirmation: '',
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  const handleSubmit = () => {
    updatePassword(
      passwordInput.currentPass,
      passwordInput.newPass,
      passwordInput.newPassConfirmation
    )
      .then((res) => {
        if (res === 'OK') {
          setPasswordInput({
            currentPass: '',
            newPass: '',
            newPassConfirmation: '',
          });

          setSuccessAlert(true);
          setErrorAlert(null);
        }
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
          Password Update
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={styles.profileField}>
            <label htmlFor="current-password">Current Password</label>
            <TextField
              id="current-password"
              variant="standard"
              type="password"
              value={passwordInput.currentPass}
              onChange={(event) =>
                setPasswordInput({
                  ...passwordInput,
                  currentPass: event.target.value,
                })
              }
            />
          </Box>

          <Box sx={styles.profileField}>
            <label htmlFor="new-password">New Password</label>
            <TextField
              id="new-password"
              variant="standard"
              type="password"
              value={passwordInput.newPass}
              onChange={(event) =>
                setPasswordInput({
                  ...passwordInput,
                  newPass: event.target.value,
                })
              }
            />
          </Box>

          <Box sx={styles.profileField}>
            <label htmlFor="confirm-new-password">
              New Password Confirmation
            </label>
            <TextField
              id="confirm-new-password"
              variant="standard"
              type="password"
              value={passwordInput.newPassConfirmation}
              onChange={(event) =>
                setPasswordInput({
                  ...passwordInput,
                  newPassConfirmation: event.target.value,
                })
              }
            />
          </Box>
        </Box>

        <Button onClick={handleSubmit} variant="outlined" sx={{ mt: 4 }}>
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
  );
}

export default PasswordUpdate;