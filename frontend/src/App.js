import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import React from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import axios from 'axios';
import Welcome from './components/Welcome/Welcome';
import PersistentDrawerLeft from './components/Drawer/Drawer';
import Profile from './components/Profile/Profile';
import Event from './components/Event/Event';
import MyEvents from './components/MyEvents/MyEvents';
import EventForm from './components/EventForm/EventForm';
import EventEditForm from './components/EventEditForm/EventEditForm';

axios.defaults.baseURL = "http://localhost/"
axios.defaults.withCredentials = true;

function App() {

    return (
    <div>
        <Router>
            <PersistentDrawerLeft />
            <Routes>
                <Route exact path ="/" element={<Home/>}> </Route>
                <Route exact path ="/homepage" element={<Welcome/>}> </Route>
                <Route exact path ="/login" element={<Login/>}> </Route>
                <Route exact path ="/register" element={<Register/>}> </Route>
                <Route exact path ="/profile" element={<Profile/>}> </Route>
                <Route exact path ="/my-events" element={<MyEvents/>}> </Route>
                <Route exact path ="/create/event" element={<EventForm/>}> </Route>
                <Route path="/event/:eventId" element={<Event />} />
                <Route path="/event-edit/:eventId" element={<EventEditForm/>}> </Route>
            </Routes>
        </Router>
    </div>
    );
}

export default App;
