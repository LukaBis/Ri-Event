import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Main } from './Main';
import { drawerWidth } from './Main';
import { AppBar } from './AppBar';
import { DrawerHeader } from './DrawerHeader';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';


<<<<<<< HEAD
=======

>>>>>>> ea3376a (fixes #66)
export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const navigate = useNavigate('');
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
<<<<<<< HEAD
            const response = await fetch('/logout', {
=======
            const response = await fetch('http://localhost:8000/logout', {
>>>>>>> ea3376a (fixes #66)
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                    'Referer':'localhost:3000'
                },
            });
    
<<<<<<< HEAD
            if (!response.ok) {
                throw new Error('Logout request failed');
            }
    
            Cookies.remove('laravel_session');
            Cookies.remove('XSRF-TOKEN');
=======
            Cookies.remove('laravel_session');
            Cookies.remove('XSRF-TOKEN');

            handleDrawerClose();
>>>>>>> ea3376a (fixes #66)
    
            navigate('/login');
         
        } catch (error) {
            console.error(error);
        }
      };

    return (
        <Box sx={{
            display: (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/homepage') ? 'flex' : 'none',
        }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                Ri-event
                </Typography>
            </Toolbar>
            </AppBar>
            <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
<<<<<<< HEAD
                        <ListItemButton>
=======
                        <ListItemButton onClick={() => navigate('/homepage')}>
>>>>>>> ea3376a (fixes #66)
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
<<<<<<< HEAD
                        <ListItemButton>
=======
                        <ListItemButton onClick={() => navigate('/events')}>
>>>>>>> ea3376a (fixes #66)
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Events"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}