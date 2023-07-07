import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Calendar from '../../components/calendar/Calendar';
import CardContent from '@mui/material/CardContent';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import { Phone } from '@mui/icons-material';

export default function ComplexGrid() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [counselor, setCounselor] = useState(null);

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

  if (!user || !counselor) {
    return <p>Loading...</p>;
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 850,
        flexGrow: 1,
        textAlign: 'left',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#c1d5d1',
        height: 'auto',
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: { xs: '80px', sm: '490px' }, // Added margin left for small screens
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <CardContent>
            <Typography variant="h4" component="div">
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography mt={2} sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
              Specialization
            </Typography>
            <Typography mt={-1} sx={{ fontSize: 16 }} variant="body2">
              {counselor.specialization}
            </Typography>
            <Typography variant="subtitle1" component="div"></Typography>
            <Typography mt={2} sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
             <PhoneInTalkRoundedIcon/> Contact
            </Typography>
            <Typography mt={-1} sx={{ fontSize: 16 }} variant="body2">
              {user.phoneNumber}
            </Typography>
            <Typography mt={2} sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
            <EmailRoundedIcon/> Email
            </Typography>
            <Typography mt={-1} sx={{ fontSize: 16 }} variant="body2">
              {user.email}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography mt={9} sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
                About
              </Typography>
              <Typography mt={-1} sx={{ fontSize: 16 }} variant="body2" gutterBottom>
                {counselor.description}
              </Typography>
              <Grid item xs>
                <ButtonBase sx={{ width: '100%', maxWidth: 600, height: 'auto', marginTop: '60px',  backgroundColor:'#fff' }}>
                  <Calendar type="public" id={counselor.id} />
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}