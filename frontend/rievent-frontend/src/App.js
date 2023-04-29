import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import React from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import axios from 'axios';
import Welcome from './components/Welcome';
import PersistentDrawerLeft from './components/Drawer/Drawer';

axios.defaults.baseURL = "http://localhost:8000/"
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
            </Routes>
        </Router>
    </div>
    );
}

export default App;
