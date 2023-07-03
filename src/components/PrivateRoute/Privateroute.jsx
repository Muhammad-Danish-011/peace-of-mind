import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../../global/Sidebar';

export default function Privateroute({children}) {

    if(sessionStorage.getItem("islogin") == null){
        return <Navigate to="/login"/>
    }
  return(
    <>
    <Sidebar></Sidebar>
    {children}
    </>
  ) 
}
