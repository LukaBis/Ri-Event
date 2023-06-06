import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import createNewEvent from '../../requests/post/createNewEvent';
import Alert from '@mui/material/Alert';
import './style.css';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

function EventForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");
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


    const resetAllFields = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setImage('');
        setAddress('');
        setLatitude('');
        setLongitude('');
        setMarker('');
    }

    const handleSubmit = () => {
        setDisabled(true);
        createNewEvent(title, description, date, time, image, address, latitude, longitude)
            .then(res => {
                if (res == 'OK') {
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

    const handleMapClick = async (event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
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
        return <GoogleMap
            zoom={12}
            center={{ lat: 45.338231, lng: 14.420597 }}
            mapContainerClassName='map-container'
            onClick={handleMapClick}
        >
            {marker && <MarkerF position={marker} />}
        </GoogleMap>
    }

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

                <Box marginBottom={2}>
                    <Typography variant="body1">
                        <b>Event location: </b>
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
