

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Button from '@mui/material/Button';



const card = (
 <React.Fragment>
    <CardContent style={{backgroundColor: "#FFFFF",
              width:'270px',
              justifyContent:"center",
              borderRadius:'30px',
              alignItems:"center",
              paddingLeft:"20px",
              height:'180px'
             }}>
      <Typography variant="h5" component="div">


<h1 style={{ fontSize: '25px', marginTop:'1rem' }}> Today's Appointments</h1>
      <Box
        sx={{
          display:'flex',
          alignItems: 'center',
          justifyContent:'center'
          
        }}>
        <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '4rem' }} />
        <h2 style={{ fontSize: '1.5rem', marginLeft: '1rem', marginBottom: '0' }}>At 6:00PM</h2>
      </Box>

      

      <Button
      sx= {{color: 'black',
            display:'flex',
            marginLeft:'115px',
            fontSize:'20px',
            marginTop:'10px'
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
      marginTop='30rem'
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


