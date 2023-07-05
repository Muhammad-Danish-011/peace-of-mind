

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function OutlinedCard({tapAppointment}) {

  // console.log(tapAppointment)
  const [ availibility, setAvailibity] = useState([]);
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();
    //method for check today`s date
    const isToday = (someDate) => {
      const today = new Date()
      someDate = new Date(someDate)
      return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    }

    const onHandleClick = () =>{
      navigate('/appointments')
    }

  useEffect(()=>{
    
    if(tapAppointment.length>0){
      const myData = [];
      const app = tapAppointment.length < 3 ? tapAppointment.splice(0,2) : tapAppointment;
      console.log({app})
      app.map((appointment)=>{
        fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/${appointment.availabilityId}`)
        .then(data => data.json())
        .then(data => {
          setLoader(false)
          if(isToday(data.date)){
            myData.push(data);
            console.log({avail: data})
            }
        })
        .catch(e=>{
          console.log(e);
        })
      })
      setAvailibity(myData)
      setLoader(true)
    }

    
  },[tapAppointment.length > 0])



  const card = (
    <React.Fragment>
       <CardContent style={{backgroundColor: "#FFFFF",
                 width:'270px',
                 justifyContent:"center",
                 borderRadius:'30px',
                 alignItems:"center",
                 paddingLeft:"20px",
                 height:'180px'
                }}>
         <Typography variant="h5" component="div">
   
   
   <h1 style={{ fontSize: '22px', marginTop:'1rem' }}> Today's Appointments</h1>
         {!availibility > 0 ? "loading": availibility.map((avail) => {
          // console.log(avail);
          const time = avail.date.split('T')[1].split('+')[0].split('').splice(0,5).join('');
          return <Box key={`appointment-${avail.id}`}
           sx={{
             display:'flex',
             alignItems: 'center',
             justifyContent:'center'
             
           }}>
           <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
           <h2 style={{ fontSize: '1.2rem', marginLeft: '1rem', marginBottom: '0' }}>{`At ${time}`}</h2>
         </Box>})
         }
   
         
   
         <Button
         sx= {{color: 'black',
               display:'flex',
               marginLeft:'115px',
               fontSize:'15px',
               marginTop:'10px'
             }}
   
         size="small" 
         onClick={onHandleClick}
         >View all</Button>
   
         {/* <Typography variant="h5" fontSize="15px"  paddingLeft="80px">
           view all 
         </Typography> */}
       </Typography>
       
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
        marginBottom:'20px'
        }}>


      <Card style={{"borderRadius":'30px'}}>{card}</Card>
    
    </Box>
  );
}



