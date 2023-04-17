import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Home.css';
import getAuthenticatedUser from '../requests/get/getAuthenticatedUser';
import PersistentDrawerLeft from './Drawer/Drawer';
import Typography from '@mui/material/Typography';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate('')

  useEffect(() => {
    if (!Cookies.get('XSRF-TOKEN')) {
        navigate('/login');
    }

    // get authenticated user
    getAuthenticatedUser().then(user => setUser(user));
  }, []);

  return (
    <div className='Home'>
        <PersistentDrawerLeft />
        <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
        </Typography>
    </div>
  );
};

export default Home;
