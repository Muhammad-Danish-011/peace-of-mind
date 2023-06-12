import React from 'react';
import { useNavigate } from 'react-router-dom';
import TappointIcon from '@mui/icons-material/EventNote';
import PrevAppointmentsIcon from '@mui/icons-material/History';
import Search from '../../components/patient/Search';
import TappointLink from '../../components/patient/TappointLink';
import Tappoint from '../../components/patient/Tappoint';
import Prevappoints from '../../components/patient/Prevappoints';
import MiniCard from '../../components/patient/MiniCard';
import BasicCard from '../../components/patient/BasicCard';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/councler');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isSmallScreen ? 'column' : 'row',
      alignItems: isSmallScreen ? 'end' : 'flex-start',
      marginLeft: isSmallScreen ? 20 : theme.spacing(35),

    }}>
      {/* Left section */}
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={2} mt={9} alignItems="center">
          <Grid item sx={{ flex: 1 }}>
            <TappointLink />
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item sx={{ flex: 1 }}>
              <Search placeholder="Search" fullWidth onClick={handleSearchClick} />
            </Grid>
          </Grid>
        </Grid>

        {/* Render BasicCard 6 times */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: theme.spacing(3),
        }}>
          {[...Array(3)].map((_, index) => (
            <BasicCard key={index} sx={{ marginBottom: '20px', flexBasis: isSmallScreen ? '100%' : '48%', flexGrow: 0 }} />
          ))}
        </Box>

      </Box>


      {/* Right section */}
      <Box  sx={{
        p: 2,
        backgroundColor: '#8fb3ac',
        height: isSmallScreen ? 'auto' : '89vh',
        overflowY: isSmallScreen ? 'scroll' : 'initial',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <Box mt={-28}>
          <TappointIcon /> <strong>Upcoming Appointment</strong>
        </Box>
        <Box mt={2}>
          <Tappoint />
        </Box>

        <Box>
          <PrevAppointmentsIcon /><strong>Previous Appointment</strong>
        </Box>
        <Box mt={2}>
          <Prevappoints />
        </Box>
        <Box>
          <PrevAppointmentsIcon /><strong>Previous Counsulted Councler</strong>
        </Box>
        <Box  mt={2}>
          <MiniCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
