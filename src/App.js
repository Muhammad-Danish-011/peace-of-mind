import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Privateroute from './components/PrivateRoute/Privateroute';
// import './App.css';
import { AuthProvider } from './components/Authcontext/AuthContext';
import SignupForm from './components/signup/SignupPage';
import Loginform from './components/login/LoginPage';
import ForgetPassword from './components/ForgetPassword/ForgotPassword';
import NewPassword from './components/newpassword/NewPassword';

import UserProfile from './components/UserProfile/UserProfile';
import Sidebar from './global/Sidebar';
import Home from './pages/home/Home';
import Councler from './pages/councler/Councler';
import Calendar from './pages/calendar/Calendar';
import CounclerProfile from './pages/counclerprofile/CounclerProfile';
import './App.css';
import Navbar from './global/Navbar'; 
import SurveyComponent from './components/patient/SurveyComponent';
import SurveyModal from './components/patient/SurveyModal';

// import './App.css';
import ProfileCard from './components/ProfileCard';
import Counselor from './components/Home/Counslor';

function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
    <Sidebar>
      <Routes>
          <Route path="/" element={ <Home /> } />
      </Routes>
    <Route path="/signup" element={<SignupForm />} />
   
    <Route path="/login" element={<Loginform />} />
    <Route index element={<Loginform />} />
    </Sidebar>
    <Routes>
    <Route path="/forget-password" element={<Privateroute><ForgetPassword /></Privateroute> } />
          <Route path="/new-password" element={<Privateroute> <NewPassword /></Privateroute> } />
          {/* <Route path="/dashboard" element={<Privateroute> <Dashboard /></Privateroute> } /> */}
          <Route path="/counselor" element={<Privateroute> <Counselor/></Privateroute> } />
          <Route path="/user-profile" element={<Privateroute> <UserProfile/></Privateroute> } />
    <Route path='/surveymodal' element={<SurveyModal/>} />  
    <Route path='/profileCard' element={<ProfileCard/>}/>
    </Routes>
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

