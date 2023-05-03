import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Home.css';
import getAuthenticatedUser from '../requests/get/getAuthenticatedUser';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import EventItem from './EventItem';
import getAllEvents from '../requests/get/getAllEvents';

const Home = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState(null);
    const navigate = useNavigate('');
    // remove this later
    const randomImages = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmF-fhAYNe-fF9ecwqRWJ2DFm5_RRUM_aez1qo7ZHOeM42AcBwSjlDLmEmcZe_xkuEK0&usqp=CAU',
        'https://www.thesu.org.uk/pageassets/events/events.jpg',
        'https://billetto.co.uk/blog/wp-content/uploads/2019/11/hanny-naibaho-aWXVxy8BSzc-unsplash-1024x683.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrH6UmvKbkjxQhHqut5ZHvdl7C4gf1ILW4VQ&usqp=CAU',
    ];

  useEffect(() => {
    if (!Cookies.get('XSRF-TOKEN')) {
        navigate('/login');
    }

    // get authenticated user
    getAuthenticatedUser().then(user => setUser(user));
    getAllEvents().then(events => setEvents(events));
  }, []);

  return (
    <div className='Home' >
        <Box className='heading' sx={{ m: 8 }}>
            <Typography variant='h3'>Hello {user?.name}, Discover Local Events</Typography>
            <Typography variant='paragraph' color={'GrayText'}>Stay up-to-date on the latest happenings and join the city's vibrant community</Typography>
        </Box>
        <Box
            className='event-list'
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                p: 1,
                m: 1,
                borderRadius: 1,
                flexWrap: 'wrap',
        }}>
            
            {events?.map((event, index) => (
                <EventItem title={event.title} description={event.description} image={randomImages[Math.floor(Math.random() * randomImages.length)]} />
            ))}
        </Box>
    </div>
  );
};

export default Home;
