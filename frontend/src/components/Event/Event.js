import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import getSingleEvent from "../../requests/get/getSingleEvent";
import "./event.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import userAttendsEvent from "../../requests/post/userAttendsEvent";
import userNotAttendingEvent from "../../requests/delete/userNotAttendingEvent";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttendeeCard from "./AttendeeCard";
import Button from '@mui/material/Button';
import dayjs from "dayjs";

function Event() {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [center, setCenter] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });

    useEffect(() => {
        getSingleEvent(eventId).then((event) => {
            setEvent(event);
            event.date = dayjs(event.date).format('dddd, MMMM D, YYYY')
            setCenter({ lat: event.latitude, lng: event.longitude });
        });
    }, []);

    function Map() {
        return (
            <GoogleMap
                zoom={13}
                center={center}
                mapContainerClassName="map-container"
            >
                <MarkerF position={center} />
            </GoogleMap>
        );
    }

    const attendEvent = () => {
        userAttendsEvent(eventId).then((res) => {
            if (res == "OK") {
                console.log("success");
                setEvent({
                    ...event,
                    attending: true,
                });
            }
        });
    };

    const notAttendingEvent = () => {
        userNotAttendingEvent(eventId).then((res) => {
            if (res == "OK") {
                console.log("success");
                setEvent({
                    ...event,
                    attending: false,
                });
            }
        });
    };

    const handleChangeAttending = () => {
        if (event.attending === false) {
            attendEvent();
        }

        if (event.attending === true) {
            notAttendingEvent();
        }
    };

    return (
        <>
            <Box className="event-container">
                <Box marginBottom={2} paddingBottom={3} paddingTop={3} className="event-title-container">
                    <Box className='wrapper'>
                        <Typography variant="h3">{event?.title}</Typography>
                        <Box sx={{ mt: 4, display: 'flex', }}>
                            <img src={'/' + event.host_image} className="host-image" />
                            <Typography variant="paragraph" sx={{ ml: 4 }}>
                                Hosted by: <br />
                                <b>{event.host}</b>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className='wrapper'>
                    <Box className="event-address-time-mobile">
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: 'white', maxWidth: '800px' }}>
                            <AccessTimeIcon sx={{ fontSize: '32px' }} />
                            <Typography sx={{ ml: 3 }}>{event?.date} at {event?.start_time}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: 'white', pt: 4, mb: 0, maxWidth: '800px' }}>
                            <LocationOnIcon sx={{ fontSize: '32px' }} />
                            <Typography sx={{ ml: 3 }}>{event?.address}</Typography>
                        </Box>
                        <Button onClick={handleChangeAttending} variant={event.attending ? "outlined" : "contained"} sx={{ width: '100%', maxWidth: '800px', mb: 4 }}>
                            {event.attending ? "Not going" : "Attend"}
                        </Button>
                    </Box>
                    <Box marginBottom={2} className="evet-image-container">
                        <img
                            src={`http://localhost/${event?.image}`}
                            alt="Event"
                            className="event-heading-image"
                        />
                        <Box className='event-address-time'>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <AccessTimeIcon sx={{ fontSize: '32px' }} />
                                <Typography sx={{ ml: 3 }}>{event?.date} at {event?.start_time}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 3, backgroundColor: 'white', pt: 4, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                <LocationOnIcon sx={{ fontSize: '32px' }} />
                                <Typography sx={{ ml: 3 }}>{event?.address}</Typography>
                            </Box>
                            <Button onClick={handleChangeAttending} variant={event.attending ? "outlined" : "contained"} sx={{ width: '100%', mb: 4 }}>
                                {event.attending ? "Not going" : "Attend"}
                            </Button>
                        </Box>
                    </Box>

                    <Box marginBottom={2} marginTop={4} className="event-desc-container">
                        <Typography variant="h4">Details</Typography>
                        <Typography variant="body1" sx={{ mt: 1, lineHeight: '30px' }}>{event?.description}</Typography>
                    </Box>

                    <Box marginBottom={2} marginTop={4} className="event-desc-container">
                        <Typography variant="h4" sx={{ mb: 3 }}>Attendees ({event?.number_of_guests})</Typography>
                        <Box className='attendees'>
                            {
                                event?.attendees?.map(user => (
                                    <AttendeeCard name={user.name} image={'http://localhost/' + user.image_path} />
                                ))
                            }
                        </Box>
                    </Box>

                    <Box marginBottom={2} sx={{ maxWidth: '800px' }}>
                        <Typography variant="body1">
                            <b>Event location: </b>
                            {!isLoaded ? <>Loading...</> : <Map />}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Event;
