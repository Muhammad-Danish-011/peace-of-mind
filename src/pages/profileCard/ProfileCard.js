import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';

// Styled components
const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem',
  backgroundColor: '#d7eded',
  borderRadius: '0.5rem',
  width: '32%',
  marginLeft:'18rem',
  marginTop: '35px !important',
  
  '@media (max-width: 768px)': {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0.5rem',
  }
}));

const Name = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginLeft: '2rem',
});

const Specialization = styled(Typography)({
  fontSize: '18px',
  marginBottom: '5px',
});

const ContactInfo = styled(Box)({
 display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '50%',
  marginTop: '1rem',
  gap: '1rem', 
  color:'#008080'
});

const ContactLabel = styled(Typography)({
  fontWeight: 'bold',
  color: '#666',
});

const Description = styled(Typography)({
  marginTop: '10px',
  color:'#008080'
});

const CalendarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  width: '100%',
});

const ProfileCard = () => {
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
    <>
      <ProfileContainer>
        <Name>{`${user.firstName} ${user.lastName}`}</Name>
        <ContactInfo>
          <ContactLabel>Specialization:</ContactLabel>
          <Typography>{counselor.specialization}</Typography>
        </ContactInfo>
        <ContactInfo>
          <ContactLabel>Phone:</ContactLabel>
          <Typography>{user.phoneNumber}</Typography>
        </ContactInfo>
        <ContactInfo>
          <ContactLabel>Email:</ContactLabel>
          <Typography>{user.email}</Typography>
        </ContactInfo>
        <Description>{counselor.description}</Description>
      </ProfileContainer>
      <Box mt={-8}>
        <CalendarContainer>
          <Calendar type={'public'} id={counselor.id} />
        </CalendarContainer>
      </Box>
    </>
  );
};

export default ProfileCard;
