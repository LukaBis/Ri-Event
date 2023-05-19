import './App.css';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import React from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import axios from 'axios';
import Welcome from './components/Welcome/Welcome';
import PersistentDrawerLeft from './components/Drawer/Drawer';
import Profile from './components/Profile/Profile';

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
            </Routes>
        </Router>
    </div>
    );
}

export default App;
