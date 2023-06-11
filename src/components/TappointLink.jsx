import React from 'react';
import { Typography } from '@mui/material';

const TappointLink = () => {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        margin: '2rem auto',
        backgroundColor: '#d7eded',
        border: '1px solid #008080',
        borderRadius: '5px',
        width: '50%',
        height: '25%',
        color: 'black',
        fontWeight: 300,
        '& h1': {
          fontSize: '1.5rem',
          marginTop: '1rem',
        },
        '& h2, & h3': {
          fontSize: '1rem',
        },
      }}
    >
      <h1>Today's Appointment</h1>
      <h2>Date & Time: 22 May-2023 Friday 6:00PM</h2>
      <h3>Today's Meeting Link: www.zoom.com</h3>
    </Typography>
  );
};

export default TappointLink;
