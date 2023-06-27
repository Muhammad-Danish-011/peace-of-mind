import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Home from './pages/home/Home';
import Councler from './pages/councler/Councler';
import Calendar from './pages/calendar/Calendar';
import CounclerProfile from './pages/counclerprofile/CounclerProfile';

import './App.css';
import Navbar from './global/Navbar';
import SurveyComponent from './components/SurveyComponent';

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
    <Route path='/room/:roomId' element={<Privateroute><Meeting /></Privateroute>} />
    
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/new-password" element={<NewPassword /> } />
    <Route path="/home" element={<Privateroute> <Home /></Privateroute>}/> 
          {/* <Route path="/dashboard" element={<Privateroute> <Dashboard /></Privateroute> } /> */}
    
    <Route path="/counselor" element={<Privateroute> <Counselor/></Privateroute> } />
    <Route path="/Calendar" element={<Privateroute> <CounselorCalender/></Privateroute> } />
    <Route path="/user-profile" element={<Privateroute> <UserProfile/></Privateroute> } />
    <Route path="/availibilitytable" element={<Privateroute> <AvailabilityTable/></Privateroute> } />
    <Route path='/search' element={<Privateroute><Search/></Privateroute>}/>
    
    <Route path='/surveymodal' element={<Privateroute><SurveyModal/></Privateroute>} />  
    <Route path='/profileCard/:userId' element={<Privateroute><ProfileCard/></Privateroute>}/>
    </Routes>
    </AuthProvider>
  </BrowserRouter>

  {/* <SurveyComponent></SurveyComponent> */}
    </div>
  );
}

export default App;

