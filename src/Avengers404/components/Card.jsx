import React from 'react'
import Tappoint from './Tappoint';
import Prevappoints from './Prevappoints';
import MiniCard from './MiniCard';
import { Box } from '@mui/material';

const Card = () => {
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
      width: '450px',
      marginTop: '60px', 
      // Use theme breakpoints for responsive design
      '@media (max-width:2200px)': {
          width: '85%',
          height: 'auto',
          marginLeft:'6%',
          position: 'relative',
          marginTop: '-10',
          display:'none'
        
      },
    }}>
      <Box mt={-55}>
        <Tappoint />
      </Box>
      <Box mt={2}>
        <Prevappoints />
      </Box>
      <Box  mt={2}>
        <MiniCard />
      </Box>
    </Box>
  )
}

export default Card