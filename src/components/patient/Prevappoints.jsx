

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function OutlinedCard({tapAppointment}) {

  const [ availibility, setAvailibity] = React.useState([]);
  const [loader, setLoader] = React.useState(null);
  const navigate = useNavigate();

  const onHandleClick = () =>{
    navigate('/appointments')
  }

      //method for check previous date
      const isPrevious = (someDate, id) => {
        const today = new Date().getTime()
        someDate = new Date(someDate).getTime()
        console.log({someDate, today, id})
        return  someDate < today;
        // someDate.getDate() <= today.getDate() &&
          // someDate.getMonth() <= today.getMonth() &&
          // someDate.getFullYear() <= today.getFullYear()
      }

  React.useEffect(()=>{
    if(tapAppointment.length > 0){
      console.log('tapAppointment', tapAppointment);
      setLoader(true);
      const myData = [];
      const app = tapAppointment.length < 3 ? tapAppointment.splice(0,3) : tapAppointment;
      console.log({app})
      app.map((appointment)=>{
        fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/${appointment.availabilityId}`)
        .then(data => data.json())
        .then(data => {
          console.log("sadfdddddddddddddddddddddd",isPrevious(data.date, data.id))
          if(isPrevious(data.date, data.id)){
            myData.push(data);
            setLoader(false)
          }
        })
        .catch(e=>{
          console.log(e);
        })
      })
      setAvailibity(myData)
    }

    },[tapAppointment])
    
  const card = (
    <React.Fragment>
       <CardContent style={{backgroundColor: "#FFFFF",
                 width:'270px',
                 justifyContent:"center",
                 borderRadius:'30px',
                 alignItems:"center",
                 paddingLeft:"20px",
                 height:'240px'
   
                }}>
         <Typography variant="h5" component="div">
   
   
   <h1 style={{ fontSize: '22px', marginTop:'1rem' }}>Previous Appointments</h1>
         {availibility.map((item) => {
          // console.log({availibility})
          const time = item.date.split('T')[1].split('+')[0].split('').splice(0,5).join('');
          return <Box
           sx={{
             display:'flex',
             alignItems: 'center',
             justifyContent:'center'
             
           }}
           key={`prevApp-${item.id}`}
           >
           <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '3rem' }} />
           <h2 style={{ fontSize: '1.2rem', marginLeft: '1rem', marginBottom: '0' }}>{loader ? "Loading" : time}</h2>
         </Box>
         })}
{/*    
         <Box
           sx={{
             display:'flex',
             alignItems: 'center',
             justifyContent:'center'
             
           }}>
           <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '4rem' }} />
           <h2 style={{ fontSize: '1.5rem', marginLeft: '1rem', marginBottom: '0' }}>At 6:00PM</h2>
         </Box> */}
   
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



