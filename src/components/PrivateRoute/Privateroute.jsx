import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../../global/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function Privateroute({ children,role }) {

  const navigate = useNavigate()

  if (sessionStorage.getItem("islogin") == null) {
    return <Navigate to="/login" />;
  }
  if(sessionStorage.getItem("role")===role || role==="PUBLIC" ){
    return (
      <>
        <Sidebar></Sidebar>
        {children}
      </>
    )
    
  }
  else if(sessionStorage.getItem("role")===role || role==="PUBLIC"){
    return (
      <>
        <Sidebar></Sidebar>
        {children}
      </>
    )

  }
  else{
    return(
      <>
      <Sidebar></Sidebar>
      <Typography variant="h4">You haven't rights to access this page<br/></Typography>
      </>
    )
  }


  
}
