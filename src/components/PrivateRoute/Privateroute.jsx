import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../../global/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Privateroute({ children }) {

  const navigate = useNavigate()

  if (sessionStorage.getItem("islogin") == null) {
    if(sessionStorage.getItem('role') === "PATIENT"){
      return <Navigate to="/login" />
    }
  }
 


  return (
    <>
      <Sidebar></Sidebar>
      {children}
    </>
  )
}
