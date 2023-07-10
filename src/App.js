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
import Search from './components/patient/Search';
import Meeting from './components/Room/Meeting';

// import './App.css';
import ProfileCard from './pages/profileCard/ProfileCard';
import Counselor from './components/Home/Counslor';
import CounselorCalender from './components/counselor-calender/counselorcalender';
import AvailabilityTable from './components/table/AppointmentAvailability';
import CurrentSessionNotes from './pages/currentSessionNotes/CurrentSessionNotes';
import Appointments from './components/Appointment/Appointments';

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
    <Route path="/home" element={<Privateroute role={"PATIENT"}> <Home /></Privateroute>}/> 
          {/* <Route path="/dashboard" element={<Privateroute> <Dashboard /></Privateroute> } /> */}
    
    <Route path="/counselor" element={<Privateroute role={"COUNSELOR"}> <Counselor /></Privateroute> } />
    <Route path="/councler" element={<Privateroute role={"PATIENT"}> <Councler /></Privateroute> } />

    <Route path="/Calendar" element={<Privateroute role={"COUNSELOR"}> <CounselorCalender/></Privateroute> } />
    <Route path="/user-profile" element={<Privateroute role="PUBLIC"> <UserProfile/></Privateroute> } />
    <Route path="/availibilitytable" element={<Privateroute role={"COUNSELOR"}> <AvailabilityTable/></Privateroute> } />
    <Route path='/search' element={<Privateroute role={"PATIENT"}><Search/></Privateroute>}/>
    {/* <Route path='/profileCard/:userId' element={<Privateroute><ProfileCard/></Privateroute>}/> */}


    <Route path='/notes/:pateintId/:appointmentId' element={<Privateroute><CurrentSessionNotes /></Privateroute>} />
    <Route path='/survey' element={<Privateroute role={"PATIENT"}><SurveyComponent/></Privateroute>} />  

    <Route path='/surveyform' element={<Privateroute role={"PATIENT"}><SurveyModal/></Privateroute>} />  
    <Route path='/profileCard/:userId' element={<Privateroute role={"PATIENT"}><ProfileCard/></Privateroute>}/>
    <Route path='/appointments' element={<Privateroute role={"PATIENT"}><Appointments/></Privateroute>}/>
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
