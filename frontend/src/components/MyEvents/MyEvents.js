import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import EventsTable from './EventsTable';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './style.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function MyEvents() {
    const [choice, setChoice] = useState('hosting');
    const navigate = useNavigate('');

    useEffect(() => {
        if (!Cookies.get('XSRF-TOKEN')) {
            navigate('/login');
        }
    }, []);

    const handleChoiceChange = (event) => {
        setChoice(event.target.value);
    };

    return (
        <>
            <Box className="my-events-list-container">
                <Typography variant='h4' sx={{ mt: 5 }}>
                        ALL MY EVENTS
                </Typography>

                <FormControl sx={{ mt: 5 }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={choice}
                        onChange={handleChoiceChange}
                    >
                        <FormControlLabel value="hosting" control={<Radio />} label="Hosting" />
                        <FormControlLabel value="attending" control={<Radio />} label="Attending" />
                    </RadioGroup>
                </FormControl>

                <Link to='/create/event'>
                    {(choice === 'hosting') && (
                        <Button variant="contained" sx={{ mt: 5, width: '150px' }}>
                            NEW EVENT
                        </Button>
                    )}
                </Link>
                <EventsTable type={choice} />
            </Box>
        </>
    )
}

export default MyEvents;