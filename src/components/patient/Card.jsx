
import React, { useCallback, useEffect, useState } from 'react';
import Tappoint from '../../components/patient/Tappoint';
import Prevappoints from '../../components/patient/Prevappoints';
import MiniCard from '../../components/patient/MiniCard';
import { Card, CardMedia, Box } from '@mui/material';

const MyCard = () => {
  const [tapAppointment, setTapAppointment] = useState([]);
  const [loader, setLoader] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const userId = JSON.parse(sessionStorage.getItem('patient_data'))?.data.id;

  useEffect(() => {
    fetch("http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall")
      .then(data => data.json())
      .then(data => {
        setAppointments(data);
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const appointment = appointments.filter(item => +userId === item.patientid && item.confirmed === true);
      setTapAppointment(appointment);
    }
  }, [appointments, userId]);

  return (
    <Card sx={{
      width: 400,
      position: 'fixed',
      top: 0,
      right: 0,
      marginTop: '73px',
      marginLeft: '20px',
      height: '100vh',
      backgroundColor: '#8fb3ac',
      
      '@media (max-width:1600px)': {
        width: '85%',
        height: 'auto',
        marginLeft:'6%',
        position: 'relative',
        marginTop: '-10',
        display:'none'
        
      },
    }}>
      <CardMedia sx={{ height: 240, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        {loader ? "loading" : <Tappoint tapAppointment={tapAppointment} />}
      </CardMedia>
      <CardMedia sx={{ height: 340, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loader ? "loading" : <Prevappoints tapAppointment={tapAppointment} />}
      </CardMedia>
      <CardMedia sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <MiniCard /> */}
      </CardMedia>
    </Card>
  );
};

export default MyCard;
