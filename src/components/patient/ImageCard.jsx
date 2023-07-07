import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Calendar from '../../components/calendar/Calendar';
import CardContent from '@mui/material/CardContent';
import PateintImage from '../../components/patient/Images/Pateintimage.jpg';
import PateintImage2 from '../../components/patient/Images/Patientimage2.jpg'
import PateintImage3 from '../../components/patient/Images/Pateintimage3.jpg.jpg'

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
        maxWidth: 400,
        flexGrow: 1,
        textAlign: 'left',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          height: '800px', // Set the desired height here

      }}
    >
    
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <ButtonBase  sx={{ width: 400, height: 128, display:'flex', flexDirection:'column' , marginTop:'360px'}}>
              <img src={PateintImage} alt="Patient" style={{ width: '300px', height: '300px' }} />
              <img src={PateintImage2} alt="Patient" style={{ width: '300px', height: '300px' }} />
              <img src={PateintImage3} alt="Patient" style={{ width: '300px', height: '300px' }} />
              </ButtonBase>              
              
            </Grid>
            {/* <Grid item xs>
              <ButtonBase sx={{ width: 400, height: 128 }}>
               <Calendar type="public" id={counselor.id} />
              </ButtonBase>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      
    </Paper>
  );
}
