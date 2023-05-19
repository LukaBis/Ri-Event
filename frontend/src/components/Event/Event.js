import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import getSingleEvent from '../../requests/get/getSingleEvent';

function Event() {

    const { eventId } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        // Function to run when the component mounts
        console.log('Component mounted');
        getSingleEvent(eventId).then(event => {
            setEvent(event);
        })
    }, []);

    return (
        <>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
                <Box marginBottom={2} marginTop={4}>
                    <Typography variant="h3">{event?.title}</Typography>
                </Box>

                <Box marginBottom={2}>
                    <img
                    src="https://media.istockphoto.com/id/868935172/photo/heres-to-tonight.jpg?s=612x612&w=0&k=20&c=v1ceJ9aZwI43rPaQeceEx5L6ODyWFVwqxqpadC2ljG0="
                    alt="Event"
                    style={{ borderRadius: '5px' }}
                    />
                </Box>

                <Box marginBottom={2}>
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
            </Box>
        </>
    )
}

export default Event