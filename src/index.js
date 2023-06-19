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
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/login" element={<Loginform />} />
    <Route index element={<Loginform />} />
    </Routes>
   
        <Routes>
          <Route path="/forget-password" element={<Privateroute><ForgetPassword /></Privateroute> } />
          <Route path="/new-password" element={<Privateroute> <NewPassword /></Privateroute> } />
          <Route path="/dashboard" element={<Privateroute> <Dashboard /></Privateroute> } />
          <Route path="/home" element={<Privateroute> <Home /></Privateroute> } />
          <Route path="/user-profile" element={<Privateroute> <UserProfile/></Privateroute> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
