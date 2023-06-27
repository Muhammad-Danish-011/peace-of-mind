import React from 'react'
import SurveyModal from '../../components/SurveyModal'
import CounclerProfile from '../counclerprofile/CounclerProfile'
import Appointments from '../../components/patient/Appointments'
import { BrowserRouter as Router, Route } from 'react-router-dom';



const Calendar = () => {
  return (
    <div>
  {/* <SurveyModal/> */}
  <CounclerProfile/>
  <Router>
  <Appointments/>
  </Router>
 
    </div>
  )
}

export default Calendar