import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from './Avengers404/Pages/SignupPage';
import Loginform from './Avengers404/Pages/LoginPage';
import NewPassword from './Avengers404/Pages/NewPassword';
import ForgetPassword from './Avengers404/Pages/ForgotPassword';
import Dashboard from './Avengers404/Pages/dashboard';
import { AuthProvider } from './Avengers404/Pages/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Home from './Avengers404/Pages/Home';

import Privateroute from './Avengers404/components/Privateroute';
import UserProfile from './Avengers404/Pages/UserProfile';
import App from './App';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
