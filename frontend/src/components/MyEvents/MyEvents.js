import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import EventsTable from './EventsTable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
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
                <Typography variant='h4' sx={{ mt: 5 }}>
                        ALL MY EVENTS
                </Typography>
                <Link to='/create/event'>
                    <Button variant="contained" sx={{ mt: 5, width: '150px' }}>
                        NEW EVENT
                    </Button>
                </Link>
                <EventsTable />
            </Box>
        </>
    )
}

export default MyEvents;