import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';



export default function OutlinedCard(props) {
  
  const navigate = useNavigate();

  function handleClick() {
    navigate('/profileCard');
  }


  return (
    
     <Box
    width='300px'
    display='flex'
    justifyContent="center"
    alignItems="center"
    sx={{
        borderRadius:'50px',
    }}
    
    >
      <Card style={{"borderRadius":'30px'}}>
      <React.Fragment>

   <CardContent style={{backgroundColor: "rgb(	184	215	209)",
          width:'220px',
          justifyContent:"center",
          borderRadius:'30px',
          alignItems:"center",
          paddingLeft:"20px"
         }}>

  <Typography variant="h5" component="div">
   Aoun Ali 
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    Social Psychology
  </Typography>
  <Typography variant="body2">
    You can add any Description here
    <br />
   
  </Typography>


  <Button
  variant='outlined'
  sx= {{color: 'black',
        borderRadius:'15px', 
        display:'flex',
        marginLeft:'40px',
        marginTop:'10px',
        fontSize:'12px',
        padding:'10px',
        bgcolor: 'white'}}
  size="small" 
  onClick={handleClick}
>Book Now</Button>

</CardContent>
</React.Fragment>
      </Card>
    </Box>
  );
}



