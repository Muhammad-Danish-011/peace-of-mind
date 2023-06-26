import { Box, CardMedia, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Calender from '../calendar/Calendar';
import { height } from '@mui/system';

const CounselorCalender = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
  const obj = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch(`${accountUrl}/user/get/${obj.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box>
      <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    minHeight: '30vh',
    '@media (max-width:1090px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:'5rem',
    }
  }}
>

  <Avatar
    alt="Remy Sharp"
    src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    sx={{
      width: 48,
      height: 48,
      marginTop: '-6rem',
      marginRight:'-10rem',
      '@media (max-width:840px)': {
        marginTop: '1rem',
        marginBottom: '1rem',
        marginLeft:'-20rem'
      },
      '@media (max-width:1090px)': {
        marginTop: '2rem',
        marginBottom: '1rem',
      },
      '@media (max-width:2000px':{
        marginRight:'1rem'
      }
    }}
  />

  {/* First and Last Name Typography */}
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontSize: '1.5rem',
      fontWeight: 'bolder',
      marginTop: '-6rem',
      marginRight:'-5rem',
      
      
      '@media (max-width:840px)': {
        marginTop: 0,
        marginLeft: 0,
        textAlign: 'center',
        marginRight:"10rem"
      },
      '@media (max-width:350px)': {
        marginTop: 0,
        marginLeft: 0,
        textAlign: 'center',
      },
      '@media (max-width:1090px)': {
        marginTop: '0rem',
        marginBottom: '1rem',
      },
      '@media (max-width:2000px':{
        marginLeft: '1rem',
        
      }
    }}
  >
    {firstName} {lastName}
  </Typography>

        <Box sx={{ p: 2, marginTop: '1rem', width: '30rem',marginRight:'20rem' ,
        '@media (max-width:840px)': {
        marginTop: 0,
        marginLeft: 0,
        textAlign: 'center',
        width:'auto',
        marginRight:"10rem"
      },}}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Chat with {firstName} {lastName}</Typography>

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
              <Typography variant="body1">
                Google Meet video conference info added after booking
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ paddingTop: '1rem', paddingLeft: '9rem', height: '40%', width: '160%',marginLeft:"2rem",marginBottom:'3rem',
    '@media (max-width:840px)': {
      marginTop: 0,
      marginLeft: 0,
      // textAlign: 'center',
      marginLeft:"-8rem",
      marginRight:"auto",
      width:'30rem',
      height:'auto'
    },}}>
        <Calender />
      </Box>
    </Box>
  );
};

export default CounselorCalender;