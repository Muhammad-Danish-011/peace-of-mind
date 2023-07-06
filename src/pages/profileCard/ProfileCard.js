// import { Box, Button, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Calendar from '../../components/calendar/Calendar';
// import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
// import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

// const ProfileCard = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [counselor, setCounselor] = useState(null);

//   // Fetch user and counselor data
//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_KEY}/user/get/${userId}`)
//       .then(response => response.json())
//       .then(user => setUser(user));

//     fetch('http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get')
//       .then(response => response.json())
//       .then(data => {
//         // Find the counselor with matching userId
//         const matchingCounselor = data.find(counselor => counselor.userId === parseInt(userId));
//         setCounselor(matchingCounselor);
//       });
//   }, [userId]);

//   // Render loading message while data is being fetched
//   if (!user || !counselor) {
//     return <p>Loading...</p>;
//   }

 

//   return (
//     <Box
//       display="flex"
//       flexDirection="flex-end"
//       p={5}
//       textAlign="left"
//       mt={8}
//       boxShadow={1}
//       borderRadius={8}
//       bgcolor="#b8d7d1"
//       mx="auto"
//       width="80%" /* Adjusted width for small screens */
    
//     >
//       <Box>
//       <Typography variant="body2" mt={2} color="textSecondary">
//         {counselor.description}
//       </Typography>
//       </Box>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           textAlign="center"
//           p={2}
//           bgcolor="#fff"
//           maxHeight={750}
//           maxWidth={500}
//           mx="auto"
//           mt={10}
//           width="90%"
//           height="90vh"
//         >
//           <Typography variant="h6" mb={2}>
//             Book Appointment
//           </Typography>
//           <Calendar type="public" id={counselor.id} />
//         </Box>
//     </Box>
//   );
// }

// export default ProfileCard;




import React from 'react'
import Profile from '../../components/patient/Profile'
import BookAppoint from '../../components/patient/BookAppoint'
import { Box } from '@mui/system'
import ImageCard from '../../components/patient/ImageCard'

const ProfileCard = () => {
  return (
   <Box>
    <Box>
    </Box>
     <Box  sx={{display:"flex", flexDirection:"row"}} >
     <ImageCard/>

       <Profile  />
       <BookAppoint/>
     </Box>
   </Box> 
   
  )
}

export default ProfileCard




