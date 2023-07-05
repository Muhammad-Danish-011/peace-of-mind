import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SurveyModal = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    navigate('/home')
  };
  
  const handleSurvey = () => {
    console.log('User wants to fill out the mental health survey');
    navigate('/survey');
  }

  return (
    <div>
      <Box
      sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '120px !important',

    maxWidth: '400px',
    margin: '0 auto',
    padding: '16px',
    '@media (max-width: 600px)': {
      maxWidth: '250px',
      padding: '8px',
      marginLeft: isSmallScreen ? 14: theme.spacing()

    },
    borderRadius: '8px',
    border: '2px solid #96bebe',
    backgroundColor: '#96bebe',
    
    
  }}
>

        
          <h2 style={{ fontSize: '24px', margin: '36px 0' }}>Take our Mental Health Survey!</h2>
          <p style={{ fontSize: '16px', margin: '34px 0' }}>We care about your well-being and would like to invite you to take our mental health survey.</p>
          <Button sx={{ color: '#008080', margin: '8px' }} onClick={handleSurvey}>Fill out survey</Button>
          <Button sx={{ color: '#008080', margin: '8px' }} onClick={handleClose}>Skip</Button>
        </Box>
    </div>
  );
};

export default SurveyModal;
