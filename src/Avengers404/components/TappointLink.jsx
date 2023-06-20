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
        borderRadius: '35px',
        marginTop:'9rem',
        marginRight:'12rem',
        width: '60%',
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
      <h2>Date & Time: 22 May-2023 Friday 6:00PM</h2>
      <h3>Today's Meeting Link: www.zoom.com</h3>
    </Typography>
  );
};

export default TappointLink;