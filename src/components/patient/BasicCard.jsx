import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Route } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Councler from '../../pages/councler/Councler';

export default function OutlinedCard({basicCard, search}) {

  const [user, setUser] = useState("")

  useEffect(() =>{
    // console.log({basicCard})
    fetch(`${process.env.REACT_APP_API_KEY}/user/get/${basicCard.userId}`)
    .then(data => data.json())
    .then(data => {
      // console.log(data)

      if(search === data.firstName){
        setUser(data)
      }
      console.log(search)

    })
  },[search])
  const slicedDesc = basicCard.description.length > 80 ? `${basicCard.description.slice(0, 80)}...` : basicCard.description;

  const card = (
    <React.Fragment>
        
       <CardContent style={{backgroundColor: "rgb(	184	215	209)",
                 width:'220px',
                 justifyContent:"center",
                 borderRadius:'30px',
                 alignItems:"center",
                 paddingLeft:"20px",
                 height: '150px'
                }}>
   
   
         <Typography sx={{fontSize: '1rem', fontWeight: 'bold'}} variant="h5" component="div">
          {`${user.firstName} ${user.lastName}` } 
         </Typography>
         <Typography sx={{ mb: 1.5, fontSize: '0.8rem' }} color="text.secondary">
           {basicCard.specialization}
         </Typography>
         <Typography variant="body2" sx={{fontSize: '0.8rem'}}>
         {/* {basicCard.description.slice(0,70) +  */}
         {slicedDesc}
          
         
           <br />
          
         </Typography>
   
   
         <Button
         variant='outlined'
         sx= {{color: 'black',
               borderRadius:'15px', 
               display:'flex',
               marginLeft:'55px',
               marginTop:'10px',
               fontSize:'12px',
               padding:'10px',
               bgcolor: 'white'}}
         size="small" 
         onClick={()=>handleClick(basicCard.userId)}>Book Now</Button>
   
       </CardContent>
     </React.Fragment>
   );

// export default function OutlinedCard(props) {
  
  const navigate = useNavigate();

  function handleClick(userId) {
    navigate(`/profileCard/${userId}`);
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
      <Card style={{"borderRadius":'30px'}}>{user && card}</Card>
    </Box>
  );
}


