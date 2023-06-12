import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const card = (
  <React.Fragment>
    <CardContent
      style={{
        backgroundColor: 'rgb(207,227,223)',
        width: '100%',
        justifyContent: 'center',
        borderRadius: '10px',
        alignItems: 'center',
        padding: '10px',
        paddingRight: '20px',
        paddingLeft: '20px',
        height: '55px',
      }}
    >
      <Typography
        variant="h5"
        fontSize="12px"
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'center', sm: 'baseline' }}
        mb="5px"
      >
        Aoun Ali{' '}
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            borderRadius: '20px',
            display: 'flex',
            marginLeft: { xs: '0', sm: '10px' },
            marginBottom: { xs: '5px', sm: '0' },
            fontSize: '8px',
            padding: '7px',
            bgcolor: 'white',
          }}
          size="small"
        >
          Book Now
        </Button>
      </Typography>

      <Typography
        sx={{ mb: 1.5 }}
        color="text.secondary"
        fontSize="10px"
        paddingRight="80px"
        marginTop="-10px"
      >
        Social Psychologist
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      sx={{
        borderRadius: '30px',
        marginBottom: '20px',
      }}
    >
      <Card
        style={{
          borderRadius: '20px',
          padding: '0px',
        }}
      >
        {card}
      </Card>
    </Box>
  );
}
