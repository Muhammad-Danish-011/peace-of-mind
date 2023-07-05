import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const ProfileCard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [counselor, setCounselor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleBookAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={5}
      textAlign="left"
      mt={8}
      boxShadow={1}
      borderRadius={8}
      bgcolor="#b8d7d1"
      maxWidth={400}
      mx="auto"
      width="80%" /* Adjusted width for small screens */
      sx={{
        '@media (max-width: 600px)': {
          /* Media query for small screens */
          maxWidth: 270, /* Adjusted maxWidth for small screens */
          p: 3, /* Adjusted padding for small screens */
          flexDirection:'flex-end'        
        },
      }}
    >
      <Typography variant="h5" mt={2}>
        {`${user.firstName} ${user.lastName} - ${counselor.specialization}`}
      </Typography>
      <Typography variant="body1" mt={1}>
        <LocalPhoneRoundedIcon/> {user.phoneNumber}
      </Typography>
      <Typography variant="body1" mt={1}>
        <EmailRoundedIcon/> {user.email}
      </Typography>
      <Box>
      <Typography variant="body2" mt={2} color="textSecondary">
        {counselor.description}
      </Typography>
      </Box>
      <Button sx={{ color: '#008080', margin: '8px', }} onClick={handleBookAppointment}>
        Book Appointment
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
      </Modal>
    </Box>
  );
}

export default ProfileCard;









