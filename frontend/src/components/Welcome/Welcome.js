import React from 'react';
import Navbar from '../Navbar/Navbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import locationImage from '../../image/location.JPG';
import organiser from '../../image/organiser.png';
import map from '../../image/karta.png';
import Paper from '@mui/material/Paper';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import styles from './styles';


const Welcome = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ md: 5, mb: 0}}>
                <Box sx={styles.boxContainer}>          
                    <Paper sx={styles.lightPaper}>
                        <Box sx={{ flexGrow: 1, ml: 5, maxWidth: '40%' }}>
                            <Typography color='#0E86D4' variant='h1' sx={styles.mainTitle}  gutterBottom>
                                Welcome to RiEvent.
                            </Typography>
                            <Typography color='#032d60' variant='h4' sx={styles.subTitle}  gutterBottom>
                                Your stay in Rijeka just got a lot more fun!
                            </Typography>
                            <Typography variant='h5' sx={styles.titleParagraph} gutterBottom>
                                Welcome to RiEvent, designed to make it easier for you to search and create events in Rijeka! Whether you're a local or a tourist, our app has everything you need to stay on top of the latest events happening in the city.
                            </Typography>
                            <Button variant='contained' startIcon={<AssignmentIndIcon />} component={Link} to='/register' sx={styles.mainButton}>
                                Signup and join
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 1, maxWidth: '50%', height: '600px', marginLeft: '3rem' }}>
                            <img src={locationImage} alt="Opis slike" style={{ maxWidth: '100%', height: '600px', borderRadius: '70px' }} />
                        </Box>
                    </Paper>
                    <Paper sx={styles.secondaryPaper}>
                        <Box sx={{ flexGrow: 1, ml: 5, maxWidth: '50%' }}>
                            <Typography variant='h5' sx={{ fontFamily: 'Helvetica', color: '#0176d3', textAlign: 'left' }} gutterBottom>
                                With our intuitive and user-friendly interface, you can easily search for events based on your interests, location, and availability. You can also filter events based on the type of event, date, and time. Plus, with our interactive map feature, you can easily locate events and get directions to the venue.
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, maxWidth: '50%' }}>
                            <img src={map} alt="Karta" style={{ maxWidth: '95%', borderRadius: '125px', objectFit: 'cover', height: '600px' }} />
                        </Box>
                    </Paper>
                    <Paper sx={styles.darkPaper}>
                        <Box sx={{ flexGrow: 1, maxWidth: '50%', mr: 5 }}>
                            <img src={organiser} alt="Organiser" style={{ maxWidth: '100%', height: '600px', objectFit: 'cover', borderRadius: '125px'}} />
                        </Box>
                        <Box sx={{ flexGrow: 1, maxWidth: '50%' }}>
                            <Typography variant='h5' sx={{ fontFamily: 'Helvetica', color: 'white', mb: 3, textAlign: 'right', marginRight: '5rem' }} gutterBottom>
                                But that's not all! If you're an event organizer or just someone who loves to host events, you can easily create and promote your own events using our app. Simply provide details about your event such as its type, location, date, and time, add an image to make it more appealing, and you're good to go! You can also manage your event through our app, keeping track of ticket sales, attendee lists, and other important details. 
                            </Typography>
                        </Box>
                    </Paper>
                    <Paper sx={styles.footer}>
                        <Box sx={{ flexGrow: 1, ml: 5 }}>
                            <Box sx={{ mt: 5 }}>
                                <Button variant='contained' startIcon={<EventNoteIcon />} component={Link} to='/login'>
                                    Explore Events
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default Welcome;
