import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './style.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function EventEditForm() {
  const location = useLocation();
  const pathname = location.pathname;
  let id = pathname.split('/event-edit/')[1];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setDate(data.data.date);
        console.log(data.data)
        setTime(data.data.start_time);
        //setImage(data.data.image);
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  }, [id]);

  const handleSubmit = () => {
    setDisabled(true);
    // Perform update event logic here

    // Example code
    // updateEvent(id, title, description, date, time, image)
    //   .then(res => {
    //     if (res === 'OK') {
    //       setSuccessAlert('Event updated successfully!');
    //       setErrorAlert(null);
    //     }

    //     setDisabled(false);
    //   })
    //   .catch(err => {
    //     setSuccessAlert(false);
    //     setErrorAlert(err.message);
    //     setDisabled(false);
    //   });
  };

  return (
    <>
      <Box className="event-form-container">
        <Typography variant="h3" sx={{ mt: 5 }}>
          Edit Event
        </Typography>
        <TextField
          disabled={disabled}
          id="standard-basic"
          label="Title"
          className="event-form-input"
          sx={{ mt: 3 }}
          variant="standard"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <TextField
          disabled={disabled}
          id="standard-basic"
          label="Date"
          className="event-form-input"
          sx={{ mt: 3 }}
          variant="standard"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <br />
        <TextField
          disabled={disabled}
          id="standard-basic"
          label="Time"
          className="event-form-input"
          sx={{ mt: 3 }}
          variant="standard"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <br/>
        <TextField
          disabled={disabled}
          type='file'
          id="standard-basic"
          label="Image"
          className="event-form-input"
          sx={{ mt: 3 }}
          variant="standard"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        
        <br />
        <Button
          variant="contained"
          sx={{ mt: 5, width: '150px' }}
          onClick={handleSubmit}
        >
          UPDATE
        </Button>

        {successAlert ? (
          <Alert severity="success" sx={{ mt: 4 }}>
            Successfully updated!
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

export default EventEditForm;
