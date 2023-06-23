import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Avengers404/global/Sidebar';
import Privateroute from './Avengers404/components/Privateroute'
// import './App.css';
import { AuthProvider } from './Avengers404/Pages/AuthContext';
import SignupForm from './Avengers404/components/SignupPage';
import Loginform from './Avengers404/Pages/LoginPage';
import ForgetPassword from './Avengers404/Pages/ForgotPassword';
import NewPassword from './Avengers404/Pages/NewPassword';
import { Dashboard, Home } from '@mui/icons-material';
import UserProfile from './Avengers404/Pages/UserProfile';

function App() {
  return (
    <div className="App">
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
     
    </div>
    
  );


// function App() {
// return(
//   <>
//   
//   </>
// )
}

export default App;

