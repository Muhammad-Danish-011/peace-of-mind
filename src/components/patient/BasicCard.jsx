import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function OutlinedCard({basicCard}) {

  const [user, setUser] = useState("")
  useEffect(() =>{
    console.log({basicCard})
    fetch(`${process.env.REACT_APP_API_KEY}/user/get/${basicCard.userId}`)
    .then(data => data.json())
    .then(data => {
      // console.log(data)
      setUser(data)
      // console.log({user})
    })
  },[])


// export default function OutlinedCard(props) {
  
  const navigate = useNavigate();

  function handleClick() {
    navigate('/profileCard');
  }
  const card = (
    <React.Fragment>
   
       <CardContent style={{backgroundColor: "rgb(	184	215	209)",
                 width:'220px',
                 justifyContent:"center",
                 borderRadius:'30px',
                 alignItems:"center",
                 paddingLeft:"20px"
                }}>
   
   
         <Typography variant="h5" component="div">
          {`${user.firstName} ${user.lastName}` } 
         </Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
           {basicCard.specialization}
         </Typography>
         <Typography variant="body2">
         {basicCard.description}
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
         size="small" >Book Now</Button>
   
       </CardContent>
     </React.Fragment>
   );


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
      <Card style={{"borderRadius":'30px'}}>{!user ? "Loading" : card}</Card>
    </Box>
  );
}



