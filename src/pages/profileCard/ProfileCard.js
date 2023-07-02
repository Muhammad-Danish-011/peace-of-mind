import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Root = styled('div')(({ theme }) => ({
  margin: 'auto',
  maxWidth: '600px',
  padding: theme.spacing(3),
}));

const ProfilePicture = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)({
  textAlign: 'center',
  fontWeight: 'bold',
});

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

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

  // Render user and counselor data in a Material UI Grid layout
  return (
    <Root>
      <ProfilePicture src={user.profilePictureUrl} alt="Profile Picture">
        <AccountCircleRoundedIcon fontSize="large" />
      </ProfilePicture>
      <Title variant="h4">{`${user.firstName} ${user.lastName}`}</Title>
      <Subtitle variant="subtitle1">{counselor.specialization}</Subtitle>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Title variant="body1">Phone Number</Title>
          <Subtitle variant="subtitle1">{user.phoneNumber}</Subtitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title variant="body1">Email</Title>
          <Subtitle variant="subtitle1">{user.email}</Subtitle>
        </Grid>
        <Grid item xs={12}>
          <Title variant="body1">Description</Title>
          <Subtitle variant="subtitle1">{counselor.description}</Subtitle>
        </Grid>
      </Grid>
    </Root>
  );
};

export default ProfileCard;
