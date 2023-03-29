import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import React from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import Navbar from './Navbar';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost/"


function App() {
  return (

    <div>
     <Router>
      <Navbar />
      
        <Routes>
          <Route exact path ="/" element={<Home/>}> </Route>
          <Route exact path ="/login" element={<Login/>}> </Route>
          <Route exact path ="/register" element={<Register/>}> </Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
