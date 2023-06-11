import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Input, InputLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './style.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import updateEvent from '../../requests/put/updateEvent'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import dayjs, { Dayjs } from 'dayjs';


function EventEditForm() {
  const location = useLocation();
  const pathname = location.pathname;
  let id = pathname.split('/event-edit/')[1];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [marker, setMarker] = useState({});

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.data.title);
        setDescription(data.data.description);
        console.log(data.data.date)
        setDate(data.data.date);
        console.log(data.data.date);
        setTime(data.data.start_time);
        setImage(data.data.image);
        setAddress(data.data.address);
        setLatitude(data.data.latitude);
        setLongitude(data.data.longitude);
        setMarker({ lat: data.data.latitude, lng: data.data.longitude });
        console.log(date);
      })
      .catch(error => {
        console.error('Error fetching event data:', error);
      });
  }, [id]);
  

  const handleSubmit = () => {
    setDisabled(true);
    // Perform update event logic here

    // Example code
    console.log(typeof (image));
    updateEvent(id, title, description, date, time, image, address, latitude, longitude)
      .then(res => {
        if (res === 'OK') {
          setSuccessAlert('Event updated successfully!');
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log(image)
    }
  };

  const handleMapClick = async (event) => {
    const newMarker = {
      lat: Number(event.latLng.lat()),
      lng: Number(event.latLng.lng()),
    };

    setLatitude(event.latLng.lat().toFixed(6));
    setLongitude(event.latLng.lng().toFixed(6));
    setMarker(newMarker);

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latLng.lat().toFixed(6)},${event.latLng.lng().toFixed(6)}&key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setAddress(data.results[0].formatted_address)
      })
      .catch((error) => console.log(error));

  };

  const Map = () => {
    return <>
    <InputLabel shrink sx={{mt: 3}}>Location</InputLabel>
    <GoogleMap
      zoom={12}
      center={marker ? marker : { lat: 45.338231, lng: 14.420597 }}
      mapContainerClassName='map-container'
      onClick={handleMapClick}
    >
      {marker && <MarkerF position={marker} />}
    </GoogleMap>
    </>
  }

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
  type='date'
  label="Date"
  className="event-form-input"
  sx={{ mt: 3 }}
  variant="standard"
  value={date}
  onChange={e => setDate(e.target.value)}
  InputLabelProps={{
    shrink: true,
  }}
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
        <br />
        {(typeof (image) === 'string') && (
          <div>
            <img src={`http://localhost/${image}`} width={300} height={300} />
          </div>
        )}

        {(typeof (image) !== 'string' && image !== null) && (
          <div>
            <img src={URL.createObjectURL(image)} width={300} height={300} />
          </div>
        )}

        <InputLabel shrink sx={{mt: 3}}>Event image</InputLabel>
        <Input
          disabled={disabled}
          src={image}
          type='file'
          id="standard-basic"
          label="Image"
          className="event-form-input"
          variant="standard"
          inputProps={{ accept: 'image/*' }} // Optional: Limit accepted file types to images
          onChange={handleImageChange}
        />


        <br />

        <Box marginBottom={2}>
          <Typography variant="body1">
            {!isLoaded ? <>Loading...</> : <Map />}
          </Typography>
          {address}
        </Box>
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
