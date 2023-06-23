import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Privateroute from './Avengers404/components/Privateroute'
import './App.css';
import { AuthProvider } from './Avengers404/Pages/AuthContext';
import SignupForm from './Avengers404/components/SignupPage';
import Loginform from './Avengers404/Pages/LoginPage';
import ForgetPassword from './Avengers404/Pages/ForgotPassword';
import NewPassword from './Avengers404/Pages/NewPassword';

import UserProfile from './Avengers404/Pages/UserProfile';
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
import ProfileCard from './pages/profileCard/ProfileCard';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Sidebar>
      <Routes>
          <Route path="/" element={ <Home /> } />
      </Routes>
    {/* <AuthProvider>
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
      </AuthProvider> */}
      {/* </Sidebar>
    </BrowserRouter> */}
     
    </Sidebar>
    <Routes>
    <Route path='/surveymodal' element={<SurveyModal/>} />  
    <Route path='/profileCard' element={<ProfileCard/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;

