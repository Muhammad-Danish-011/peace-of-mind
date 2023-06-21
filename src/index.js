import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom';
import App from './App'
import SignupForm from './Avengers404/Pages/SignupPage';
import Loginform from './Avengers404/Pages/LoginPage';
import NewPassword from './Avengers404/Pages/NewPassword';
import ForgetPassword from './Avengers404/Pages/ForgotPassword';
import Dashboard from './Avengers404/Pages/dashboard';
import Home from './Avengers404/Pages/Home';
import UserProfile from './Avengers404/Pages/UserProfile';

import Privateroute from './Avengers404/components/Privateroute';
import { AuthProvider } from './Avengers404/Pages/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
