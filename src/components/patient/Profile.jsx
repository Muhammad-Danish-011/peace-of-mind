import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Calendar from '../../components/calendar/Calendar';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const Profile = () => {
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
      p={5}
      textAlign="left"
      mt={12}
      boxShadow={1}
      // borderRadius={8}
      bgcolor="#b8d7d1"
      maxWidth={500}
      maxHeight={200}
      mx="auto"
     
    >
      <Typography variant="h5" mt={2}>
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <Typography variant="h6" mt={1}>
      <p>Specialization: {counselor.specialization}</p>
      </Typography>
      <Typography variant="body1" mt={1}>
        <LocalPhoneRoundedIcon/> {user.phoneNumber}
      </Typography>
      <Typography variant="body1" mt={1}>
        <EmailRoundedIcon/> {user.email}
      </Typography>
      <Box>
      <Typography variant="body1" gutterBottom>
        {counselor.description}
      </Typography>
      </Box>
    </Box>
  );
}

export default Profile;




