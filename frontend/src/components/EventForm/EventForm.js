import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import createNewEvent from '../../requests/post/createNewEvent';
import Alert from '@mui/material/Alert';
import './style.css';

function EventForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false)

    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);

    const resetAllFields = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setImage('');
    }

    const handleSubmit = () => {
        setDisabled(true);
        createNewEvent(title, description, date, time, image)
        .then(res => {
            if(res == 'OK') {
                resetAllFields()
                setSuccessAlert('Event created successfuly!');
                setErrorAlert(null);
            }

            setDisabled(false);
        })
        .catch(err => {
            setSuccessAlert(false);
            setErrorAlert(err.message);
            setDisabled(false);
        });
    };

  return (
    <>
        <Box className="event-form-container">
            <Typography variant="h3" sx={{ mt: 5 }}>
                Create New Event
            </Typography>
            <TextField
                disabled={disabled}
                id="standard-basic"
                label="Title"
                className="event-form-input"
                sx={{ mt: 3 }}
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <TextField
                disabled={disabled}
                id="standard-basic"
                label="Description"
                className="event-form-input"
                sx={{ mt: 3 }}
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label style={{ marginTop: '2rem' }}>Date: </label>
            <input
                disabled={disabled}
                type="date"
                value={date}
                className="event-date"
                onChange={(e) => {
                    setDate(e.target.value);
                }}
            />
            <br />
            <label style={{ marginTop: '1.5rem' }}>Time: </label>
            <input
                disabled={disabled}
                type="time"
                value={time}
                className="event-time"
                onChange={(e) => setTime(e.target.value)}
            />
            <label style={{ marginTop: '1.5rem' }}>Image: </label>
            <input
                disabled={disabled}
                type="file"
                className="event-image"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            <Button
                variant="contained"
                sx={{ mt: 5, width: '150px' }}
                onClick={handleSubmit}
            >
                CREATE
            </Button>

            {successAlert ? (
                    <Alert severity="success" sx={{ mt: 4 }}>
                        Successfully created!
                    </Alert>
                ) : null}

            {errorAlert ? (
                <Alert severity="error" sx={{ mt: 4 }}>
                    {errorAlert}
                </Alert>
            ) : null}
        </Box>
    </>
  );
}

export default EventForm;
