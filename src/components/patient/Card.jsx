import React, { useCallback, useEffect, useState } from 'react'
import Tappoint from '../../components/patient/Tappoint';
import Prevappoints from '../../components/patient/Prevappoints';
import MiniCard from '../../components/patient/MiniCard';
import { Box } from '@mui/material';

const Card = () => {

  const [tapAppointment, setTapAppoinetment] = useState([]);
  const [loader, setLoader] = useState(true);
  const [ appointments, setAppopintments] = useState([]);
  const userId = sessionStorage.getItem('loginUserId')
  
  useEffect(() =>{

    // setLoader(true);
    fetch("http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall")
    .then(data => data.json())
    .then(data => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
      setAppopintments(data);
      setLoader(false)
    })
    

},[])

  useEffect(()=>{

    if(appointments.length>0)
    {
      const appointment = [];
      appointments.map((item)=>{
        if(+userId === item.patientid && item.confirmed === true ){
          appointment.push(item);
        }
      })

      console.log('inner useEffect', appointment);
      setTapAppoinetment(appointment)

    }

  },[appointments.length>0])


  return (
    <Box sx={{
      p: 2,
      backgroundColor: '#8fb3ac',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      marginTop: '60px', 
      // Use theme breakpoints for responsive design
      '@media (max-width:1600px)': {
        width: '85%',
        height: 'auto',
        marginLeft:'6%',
        position: 'relative',
        marginTop: '-10',
        display:'none'
        
      },
    }}>
      <Box mt={-15}>
        {loader ? "loading" : <Tappoint tapAppointment={tapAppointment}/>  }
      </Box>
      <Box mt={2}>
        {loader ? "loading" : <Prevappoints tapAppointment={tapAppointment}/>}
      </Box>
      <Box  mt={2}>
        <MiniCard />
      </Box>
    </Box>
  )
}

export default Card