import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const TappointLink = ({availability}) => {

  const [date, setDate] =useState('')
  const [loading, setLoading] = useState(false);

  useEffect(()=>{

    if(availability){
      let d = new Date(availability.avail.date)
    setDate(d)
    setLoading(true)
    }
  },[availability])



  return (
    <Typography
      sx={{
        textAlign: 'center',
        margin: '2rem auto',
        backgroundColor: '#d7eded',
        border: '1px solid #008080',
        borderRadius: '35px',
        width: '45%',
        height: '25%',
        color: 'black',
        fontWeight: 300,
        '& h1': {
          fontSize: '2.5rem',
          marginTop: '2rem',
        },
        '& h2, & h3': {
          fontSize: '1.5rem',
        },
        '@media (max-width: 768px)': {
          width: '80%',
          height: 'auto',
          '& h1': {
            fontSize: '1.3rem',
          },
          '& h2, & h3': {
            fontSize: '0.9rem',
          },
        },
        '@media (max-width: 480px)': {
          width: '90%',
          height: 'auto',
          '& h1': {
            fontSize: '1.1rem',
            marginTop: '0.5rem',
          },
          '& h2, & h3': {
            fontSize: '0.8rem',
          },
        },
      }}
    >
      <h1>Today's Appointment</h1>
      <h2>{loading ? date.toString().split(' ').splice(0,5).join(' ') : "Loading"}</h2>
      <h3>Today's Meeting Link: <a href={availability.appointment.meetingURL} target="_blank" rel="noreferrer" > {availability.appointment.meetingURL}</a></h3>
    </Typography>
  );
};

export default TappointLink;
