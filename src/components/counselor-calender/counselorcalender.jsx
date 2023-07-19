import { Box, CardMedia, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Calender from '../calendar/Calendar';
import { height } from '@mui/system';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const CounselorCalender = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
  const obj = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch(`${accountUrl}/user/get/${obj?.id}`)
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
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          minHeight: '30vh',
          '@media (max-width:1090px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5rem',
          }
        }}
      >


        <AccountCircleTwoToneIcon sx={{
          width: '80px',
          height: '100px',
          color: 'darkgreen',
          margin: "-5.5% 1% 0% 10%",
          '@media (max-width:840px)': {
            marginTop: 0,
            marginLeft: 0,
            textAlign: 'center',
            marginRight: "10rem"
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
          '@media (max-width:2000px': {
            marginLeft: '1rem',

          }
        }} />

        {/* First and Last Name Typography */}
        <Typography
          variant="h6"
          component="h6"
          data-testid="name"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bolder',
            marginTop: '-6rem',
            marginRight: '-5rem',


            '@media (max-width:840px)': {
              marginTop: 0,
              marginLeft: 0,
              textAlign: 'center',
              marginRight: "10rem"
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
            '@media (max-width:2000px': {
              marginLeft: '1rem',

            }
          }}
        >
          {firstName} {lastName}
        </Typography>

        <Box sx={{
          p: 0, width: '30rem', marginLeft: "16%",
          '@media (max-width:840px)': {
            marginTop: 0,
            marginLeft: 0,
            textAlign: 'center',
            width: 'auto',
            marginRight: "10rem"
          },
        }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" data-testid="chat">Chat with {firstName} {lastName}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <CardMedia
                component="img"
                src="https://icons.iconarchive.com/icons/pictogrammers/material-light/256/clock-icon.png"
                alt="Clock"
                sx={{ width: 25, height: 25, mr: 2 }}
              />
              <Typography variant="body1" data-testid="30">Max 30 mins appointment</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                src="https://icons.iconarchive.com/icons/simpleicons-team/simple/256/google-meet-icon.png"
                alt="Meet Video"
                sx={{ width: 25, height: 25, mr: 2 }}
              />
              <Typography variant="body1" data-testid="google-meet">
                Video conference info
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>


      <Box sx={{
        display: "flex",
        margin: "0% 10%",
        flexDirection: "row",
        marginBottom:'10rem'


      }}>
        <Calender type={'private'} />
      </Box>
    </Box>
  );
};

export default CounselorCalender;