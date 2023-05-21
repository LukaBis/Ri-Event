import React from 'react';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style.css';

function EventForm() {
    return (
        <>
            <Box className="event-form-container">
                <Typography variant='h3' sx={{ mt: 5 }}>
                    Create New Event
                </Typography>
                <TextField
                    id="standard-basic"
                    label="Title"
                    className='event-form-input'
                    sx={{ mt: 3 }}
                    variant="standard"/>
                <br />
                <TextField
                    id="standard-basic"
                    label="Description"
                    className='event-form-input'
                    sx={{ mt: 3 }}
                    variant="standard"/>
                <br />
                <label style={{ marginTop: '2rem' }}>Date: </label>
                <input type='date' value={null} className='event-date' />
                <br />
                <label style={{ marginTop: '1.5rem' }}>Time: </label>
                <input type='time' value={null} className='event-time' />
                <label style={{ marginTop: '1.5rem' }}>Image: </label>
                <input type='file' value={null} className='event-image' />
                <br />
                <Button variant="contained" sx={{ mt: 5, width: '150px' }}>
                    CREATE
                </Button>
            </Box>
        </>
    )
}

export default EventForm