import React from 'react'
import SurveyModal from '../../components/patient/SurveyModal'
import CounclerProfile from '../counclerprofile/CounclerProfile'
import Appointments from '../../components/patient/Appointments'
import { BrowserRouter as Router, Route } from 'react-router-dom';



const Calendar = () => {
  return (
    <div>
  {/* <SurveyModal/> */}
  
  
  <Appointments/>
  
 
    </div>
  )
}

export default Calendar