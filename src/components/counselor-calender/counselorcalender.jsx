import { Box, CardMedia, Paper, Typography } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Calender from '../calendar/Calendar';


const CounselorCalender = () => {
  return (
    <div>
    <Box sx={{ display: 'Flex', alignItems: 'center', marginTop: '1rem', marginLeft: '1rem' }}>
  <Avatar
    alt="Remy Sharp"
    src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    sx={{ width: 48, height: 48, marginTop:'-6rem' }}
  />
  <Typography variant="h6" component="h6" sx={{ marginLeft: '1rem', fontSize: 20, fontWeight: 'bolder', marginTop:'-6rem' }}>
    Justin Pot
  </Typography>

    <Box sx={{ p: 2,marginLeft:'20rem',marginTop:'1rem' ,width:'30rem' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">Chat with Justin Pot</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <CardMedia
            component="img"
            src="https://icons.iconarchive.com/icons/pictogrammers/material-light/256/clock-icon.png"
            alt="Clock"
            sx={{ width: 25, height: 25, mr: 2 }}
          />
          <Typography variant="body1">30 mins appointment</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            src="https://icons.iconarchive.com/icons/simpleicons-team/simple/256/google-meet-icon.png"
            alt="Meet Video"
            sx={{ width: 25, height: 25, mr: 2 }}
          />
            <Typography variant="body1">Google Meet video conference info added after booking</Typography>
        </Box>
      </Paper>
    </Box>

    </Box>

    <Box sx={{paddingTop:'1rem', paddingLeft:'5rem',height :'40%', width: '90%'}}>
      <Calender/>
    </Box>
    
    </div>
  );
};

export default CounselorCalender;