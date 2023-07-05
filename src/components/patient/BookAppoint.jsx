import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';

const BookAppoint = () => {
      const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [counselor, setCounselor] = useState(null);

  // Fetch user and counselor data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}/user/get/${userId}`)
      .then(response => response.json())
      .then(user => setUser(user));

    fetch('http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get')
      .then(response => response.json())
      .then(data => {
        // Find the counselor with matching userId
        const matchingCounselor = data.find(counselor => counselor.userId === parseInt(userId));
        setCounselor(matchingCounselor);
      });
  }, [userId]);

  // Render loading message while data is being fetched
  if (!user || !counselor) {
    return <p>Loading...</p>;
  }

  return (
    <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={2}
          bgcolor="#fff"
          maxHeight={750}
          maxWidth={500}
          mx="auto"
          mt={10}
          width="90%"
          height="90vh"
        >
        
          <Typography variant="h6" mb={2}>
            Book Appointment
          </Typography>
          <Calendar type="public" id={counselor.id} />
        </Box>
  )
}

export default BookAppoint