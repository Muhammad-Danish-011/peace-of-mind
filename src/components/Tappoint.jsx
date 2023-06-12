// import { Box, Typography } from '@mui/material';
// import React from 'react';
// import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

// const Tappoint = () => {
//   return (
//     <Typography sx={{ 
//       textAlign: 'center', 
//       margin: '2rem auto', 
//       backgroundColor: '#white', 
//       border: '1px solid #008080',
//       borderRadius: '5px',
//       width: '40%',
//       color: 'black',
//       height: '20%',
//       fontWeight: 'thin'
//     }}>

//       <h1 style={{ fontSize: '1rem', marginTop:'1rem' }}>Today's Appointment</h1>
//       <Box
//         sx={{
//           display:'flex',
//           alignItems: 'center',
//           justifyContent:'center'
          
//         }}>
//         <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
//         <h2 style={{ fontSize: '1rem', marginLeft: '1rem', marginBottom: '1 rem' }}>At 6:00PM</h2>
//       </Box>
//     </Typography>
//   )
// }

// export default Tappoint;

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Button } from '@mui/material';



const card = (
 <React.Fragment>
    <CardContent style={{backgroundColor: "#FFFFF",
              width:'220px',
              justifyContent:"center",
              borderRadius:'30px',
              alignItems:"center",
              paddingLeft:"20px",
             }}>
      <Typography variant="h5" component="div">


<h1 style={{ fontSize: '15px', marginTop:'1rem' }}>Today's Appointments</h1>
      <Box
        sx={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
          
        }}>
          
        <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
        <h2 style={{ fontSize: '1rem', marginLeft: '1rem', marginBottom: '1 rem' }}>At 6:00PM</h2>
      </Box>

      
            <Button
      sx= {{color: 'black',
            display:'flex',
            marginLeft:'115px',
            fontSize:'8px',
          }}

      size="small" >View all</Button>

    </Typography>
    
        </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
     <Box
      width='300px'
      display='flex'
      justifyContent="center"
      alignItems="center"
      sx={{
        borderRadius:'50px',
        marginBottom:'20px'
        }}>


      <Card style={{"borderRadius":'30px'}}>{card}</Card>
    
    </Box>
  );
}



