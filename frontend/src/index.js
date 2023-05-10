import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import Navbar from './components/Navbar/Navbar';
=======
import Navbar from './Navbar';
>>>>>>> 2df3bba (fixes #51)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
  
  </React.StrictMode>,


 
 
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
