import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../global/Sidebar';
import Privateroute from '../components/Privateroute'
// import './App.css';
import { AuthProvider } from './AuthContext';
import SignupForm from './Avengers404/components/SignupPage';
import Loginform from './LoginPage';
import ForgetPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import { Dashboard, Home } from '@mui/icons-material';
import UserProfile from './UserProfile';

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
}

export default App;

