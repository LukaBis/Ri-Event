import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import getSingleEvent from '../../requests/get/getSingleEvent';
import './event.css';
import userAttendsEvent from '../../requests/post/userAttendsEvent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import userNotAttendingEvent from '../../requests/delete/userNotAttendingEvent';

function Event() {

    const { eventId } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        getSingleEvent(eventId).then(event => {
            setEvent(event);
        })
    }, []);

    const attendEvent = () => {
        userAttendsEvent(eventId)
        .then(res => {
            if (res == 'OK') {
                console.log('success')
                setEvent({
                    ...event,
                    attending: true,
                });
            }
        })
    }

    const notAttendingEvent = () => {
        userNotAttendingEvent(eventId)
        .then(res => {
            if (res == 'OK') {
                console.log('success')
                setEvent({
                    ...event,
                    attending: false,
                });
            }
        })
    }

    const handleChangeAttending = () => {
        if (event.attending === false) {
            attendEvent();
        }

        if (event.attending === true) {
            notAttendingEvent();
        }
    }

    return (
        <>
            <Box className='event-container'>
                <Box marginBottom={2} marginTop={3} className='event-title-container'>
                    <Typography variant="h3">{event?.title}</Typography>
                    <p variant="paragraph" style={{ color: 'grey' }}>
                        Number of guests: <b>{event?.number_of_guests}</b>
                    </p>
                </Box>

                <Box marginBottom={2} className='evet-image-container'>
                    <img
                        src="https://media.istockphoto.com/id/868935172/photo/heres-to-tonight.jpg?s=612x612&w=0&k=20&c=v1ceJ9aZwI43rPaQeceEx5L6ODyWFVwqxqpadC2ljG0="
                        alt="Event"
                        className='event-image'
                    />
                </Box>

                <Box marginBottom={2} className='event-desc-container'>
                    <Typography variant="body1">
                        {event?.description}
                    </Typography>
                </Box>

                <Box marginBottom={2}>
                    <Typography variant="body1">
                        <b>Host: </b> {event?.host}
                    </Typography>
                </Box>

                <Box marginBottom={2}>
                    <Typography variant="body1">
                        <b>Event date: </b> {event?.date}
                    </Typography>
                </Box>

                <Box marginBottom={2}>
                    <Typography variant="body1">
                        <b>Event start time: </b> {event?.start_time}
                    </Typography>
                </Box>

                <FormControlLabel control={<Switch checked={event?.attending} onChange={handleChangeAttending} />} label={event?.attending ? "Going" : "Not going"} />
            </Box>
        </>
    )
}

export default Event