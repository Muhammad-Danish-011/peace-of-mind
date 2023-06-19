// import React, { useContext, useEffect } from 'react';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// function Dashboard() {
//   const navigate = useNavigate();
//   const { isLoggedIn, setLoginStatus } = useContext(AuthContext);

//   const handleLogout = () => {
//     console.log('Performing logout actions...');
//     setLoginStatus(false);
//     navigate('/login');
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/dashboard');
//       setLoginStatus(true);  // Redirect to the login page if not logged in
//     }
//     else {
//       navigate('/login');
//       setLoginStatus(false); // Redirect to the login page if not logged in

//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div>
//       <h2>Welcome to the Dashboard</h2>
//       <Button onClick={handleLogout} variant="contained" color="primary">
//         Logout
//       </Button>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, setLoginStatus } = useContext(AuthContext);

  const handleLogout = () => {
    console.log('Performing logout actions...');
    setLoginStatus(false);
    sessionStorage.removeItem("islogin");
    navigate('/login');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
