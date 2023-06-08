import { Box, Typography } from '@mui/material';
import React from 'react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const Tappoint = () => {
  return (
    <Typography sx={{ 
      textAlign: 'center', 
      margin: '2rem auto', 
      backgroundColor: '#white', 
      border: '1px solid #008080',
      borderRadius: '5px',
      width: '40%',
      color: 'black',
      height: '20%',
      fontWeight: 'thin'
    }}>

      <h1 style={{ fontSize: '1rem', marginTop:'1rem' }}>Today's Appointment</h1>
      <Box
        sx={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
          
        }}>
        <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
        <h2 style={{ fontSize: '1rem', marginLeft: '1rem', marginBottom: '1 rem' }}>At 6:00PM</h2>
      </Box>
    </Typography>
  )
}

export default Tappoint;
