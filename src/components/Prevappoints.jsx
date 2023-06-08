import React from 'react'
import { Typography, Box } from '@mui/material'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const Prevappoints = () => {
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

      <h1 style={{ fontSize: '1rem', marginTop:'1rem'  }}>Previous Appoints</h1>
      <Box
        sx={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
          
        }}>
        <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
        <h2 style={{ fontSize: '1rem', marginLeft: '1rem', marginBottom: '0' }}>At 6:00PM</h2>
      </Box>
      <Box
        sx={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
          
        }}>
        <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
        <h2 style={{ fontSize: '1rem', marginLeft: '1rem', marginBottom: '0' }}>At 6:00PM</h2>
      </Box>
      <h2 style={{ fontSize: '1rem', marginLeft: '9rem', marginBottom: '0' }}>view all</h2>
    </Typography>
  )
}

export default Prevappoints