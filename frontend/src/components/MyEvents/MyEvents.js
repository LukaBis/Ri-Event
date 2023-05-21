import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import EventsTable from './EventsTable';
import './style.css';

function MyEvents() {
    
    const navigate = useNavigate('');

    useEffect(() => {
        if (!Cookies.get('XSRF-TOKEN')) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Box className="my-events-list-container">
                <Typography variant='h3' sx={{ mt: 5 }}>
                    All My Events
                </Typography>
                <EventsTable />
            </Box>
        </>
    )
}

export default MyEvents;