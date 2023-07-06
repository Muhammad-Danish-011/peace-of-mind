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
import Calendar from './pages/calendar/Calendar';
import CounclerProfile from './pages/counclerprofile/CounclerProfile';
import './App.css';
import Navbar from './global/Navbar'; 
import SurveyComponent from './components/patient/SurveyComponent';
import SurveyModal from './components/patient/SurveyModal';
import Search from './components/patient/Search';
import Meeting from './components/Room/Meeting';
// import './App.css';
import ProfileCard from './pages/profileCard/ProfileCard';
import Counselor from './components/Home/Counslor';
import CounselorCalender from './components/counselor-calender/counselorcalender';
import AvailabilityTable from './components/table/AppointmentAvailability';
import Appointments from './components/Appointment/Appointments';

import Councler from './pages/councler/Councler';
import RatingUI from './components/Rating/rating';

function App() {
  return (
    <div className="App">
   
    <BrowserRouter>
    <AuthProvider>



    <Routes>
    {/* <Sidebar> */}
      {/* <Routes>
         } />
      </Routes> */}
    <Route path="/signup" element={<SignupForm />} />
   
    <Route path="/login" element={<Loginform />} />
    <Route index element={<Loginform />} />
    {/* </Sidebar> */}
    {/* <Route path='/room/:roomId' element={<Privateroute><Meeting /></Privateroute>} /> */}
    
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/new-password" element={<NewPassword /> } />
    <Route path="/home" element={<Privateroute> <Home /></Privateroute>}/> 
          {/* <Route path="/dashboard" element={<Privateroute> <Dashboard /></Privateroute> } /> */}
    
    <Route path="/counselor" element={<Privateroute> <Counselor /></Privateroute> } />
    <Route path="/councler" element={<Privateroute> <Councler /></Privateroute> } />

    <Route path="/Calendar" element={<Privateroute> <CounselorCalender/></Privateroute> } />
    <Route path="/user-profile" element={<Privateroute> <UserProfile/></Privateroute> } />
    <Route path="/availibilitytable" element={<Privateroute> <AvailabilityTable/></Privateroute> } />
    <Route path='/search' element={<Privateroute><Search/></Privateroute>}/>
    <Route path='/profileCard/:userId' element={<Privateroute><ProfileCard/></Privateroute>}/>
    <Route path='/survey' element={<Privateroute><SurveyComponent/></Privateroute>} />  

    <Route path='/surveyform' element={<Privateroute><SurveyModal/></Privateroute>} />  
    <Route path='/profileCard/:userId' element={<Privateroute><ProfileCard/></Privateroute>}/>
    <Route path='/appointments' element={<Privateroute><Appointments/></Privateroute>}/>
    <Route path='/rating/:appointmentId' element={<Privateroute><RatingUI/></Privateroute>}/>
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
// check
}


export default App;
