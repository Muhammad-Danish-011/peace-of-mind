// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import BasicCard from "../BasicCard";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// // import TappointLink from "../";

// import { useNavigate } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import Rating from "@mui/material/Rating";
// import Sidebar from "../../global/Sidebar";
// const styles = {
//   container: {
//     maxWidth: 1500,
//     marginTop: "-1% !important",
//     padding: "20px",
//     margin: "0 auto",
//   },
//   cardContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 280px)",
//     rowGap: "15px",
//     marginRight: "-31rem",
//     columnGap: "300px",
//     justifyContent: "center",
//     marginTop: "90px !important",
//     "@media (max-width: 1000px)": {
//       display: "flex",
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       alignItems: "center",
//       rowGap: "10px",
//       columnGap: "10px",
//     },
//   },
//   rightContainer: {
//     backgroundColor: "#EEEEEE",
//     padding: "10px",
//     marginLeft: "10rem",
//   },
// };
// const Counselor = ({ loggedIn }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const [rating, setRating] = useState(0);
//   const handleRatingChange = (event, newRating) => {
//     setRating(newRating);
//   };
//   return (
//     <>
//   <Box
//     sx={{
//       ...styles.container,
//       marginLeft: isSmallScreen ? 10 : theme.spacing(10),
//     }}
//   >
//     {/* <Tappoint?Link /> */}
//     <Box
//       sx={{
//         ...styles.cardContainer,
//         marginLeft: isSmallScreen ? 10 : theme.spacing(11),
        
//       }}
//       style={{
//         marginTop: "0.5rem",
//         marginLeft: isSmallScreen ? "-25rem" : "2.5rem",
//         fontSize: isSmallScreen ? "0.5rem" : "2rem",
//         fontWeight: "bolder",
//       }}
//     >
//       {/* <BasicCard /> */}
//       {/* <BasicCard /> */}
//     </Box>
//     {/* <Card /> */}
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: isSmallScreen ? "column" : "row",
//         justifyContent: "space-around",
//       }}
//     >
//       <Box
//         sx={{
//           marginTop: isSmallScreen ? "2rem" : 0,
//           marginLeft: isSmallScreen ? 0 : "15rem",
//           textAlign: isSmallScreen ? "center" : "left",
//         }}
//       >
//         <Rating
//           style={{
//             borderRadius: "1rem",
//             fontSize: isSmallScreen ? "2rem" : "4rem",
//             marginTop: isSmallScreen ? 0 : "1rem",
//           }}
//           name="rating"
//           value={rating}
//           onChange={handleRatingChange}
//         />
//         <Typography
//           variant="h5"
//           component="div"
//           style={{
//             marginTop: "0.5rem",
//             marginLeft: isSmallScreen ? 0 : "2.5rem",
//             fontSize: isSmallScreen ? "1.5rem" : "2rem",
//             fontWeight: "bolder",
//           }}
//         >
//           Overall Ratings
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           marginTop: isSmallScreen ? "2rem" : "2.5rem",
//           marginLeft: isSmallScreen ? 0 : "1rem",
//           textAlign: isSmallScreen ? "center" : "left",
//         }}
//       >
//         <Typography
//           style={{
//             fontSize: isSmallScreen ? "2rem" : "2.5rem",
//             marginTop: isSmallScreen ? "1rem" : "-1rem",
//             fontWeight: "bolder",
//             paddingLeft: isSmallScreen ? 0 : "5rem",
//           }}
//           variant="h5"
//           component="div"
//         >
//           Micheal Clerk
//         </Typography>
//         <AccountCircleRoundedIcon
//           style={{
//             fontSize: isSmallScreen ? "36px" : "48px",
//             marginTop: isSmallScreen ? 0 : "0.1rem",
//             marginRight: "1rem",
//           }}
//           sx={{ color: "#008080", bgcolor: "white", borderRadius: "50%" }}
//         />
//         <Rating
//           style={{ fontSize: isSmallScreen ? "2rem" : "2.5rem", marginTop: "0.1rem" }}
//           name="rating"
//           value={rating}
//           onChange={handleRatingChange}
//         />
//         <Typography
//           style={{ fontSize: "2rem" }}
//           variant="body"
//           component="div"
//         >
//           Great experience! Made a same <br />
//           day appointment
//         </Typography>
//       </Box>
//     </Box>
//   </Box>
// </>
//   );
// };
// export default Counselor;



import React, {useState,useEffect} from 'react';
 import { Box, Typography, Rating } from "@mui/material";
 import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';



 const Counslor = () => {
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const objs = JSON.parse(sessionStorage.getItem('availibilty_data'));
  // console.log(objs);
  console.log(obj);
  const [value, setRatings] = useState("");
  const [note, setReviewNotes] = useState("");
  
  useEffect(() => {
    fetchRatingsAndReviewNotes();
    fetchAppointmentCount();
  }, []);

  const fetchRatingsAndReviewNotes = async () => {
    try {
      const response = await fetch(`http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/26`);
      const data = await response.json();
      console.log(data.value);
      setRatings(data.value);
      setReviewNotes(data.note);

      // const reviewNotesResponse = await fetch(`http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/26`);
      // const reviewNotesData = await reviewNotesResponse.json();
      // setReviewNotes(reviewNotesData.note);
      // console.log(reviewNotesData.note);
    } catch (error) {
      console.error('Error fetching ratings and review notes:', error);
    }
  };

  const fetchAppointmentCount = async () => {
    try {
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`);
      const data = await response.json();
      const latestAvailabilityId = data[data.length - 1].id;
      setAppointmentCount(data.length);
    } 
      catch (error) {
        console.error('Error fetching appointment count:', error);
      }
  };

  return (
   <>
   <Box sx={{
      border: "2px solid green",
      borderRadius: "10px",
      fontFamily: "Quicksand, sans-serif",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "2rem 1rem 1rem 8rem",
   }}>


<Box sx={{
  border: "1px solid green",
alignSelf: "center",
borderRadius: "10px",
width: "60%",
height: "10%",
margin: "8% 0% 2% 0%",
backgroundColor: "#00b3b3",
justifyContent: "center",
display: "flex",
flexDirection: "column"


}}>

<h3>Today's Appointments</h3>

<p>Date & Time: 22-May-2023 Friday 6:00 PM</p>

 <p>Today's Meeting Link: <a href="www.zoom.com">www.zoom.com</a></p>
</Box>

<Box sx={{
  display: "flex",
  flexDirection: "row",
  width: "80%",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "0% 3% 2% 6%",

  '@media (max-width: 950px)': {
   display: "flex",
flexDirection: "column",
alignContent: "space-around"



  }
 

}}>

<Box sx={{
 
  borderRadius: "10px",
  backgroundColor: "#00b3b3",
  height: "100%",
  padding: "3%",

  '@media (max-width: 950px)': {
   marginBottom: "1rem",
   alignItems: "center",
   
 
 
   }
}}>
<Typography variant= "h5">
  WEEKLY APPOINTMENTS
</Typography> 
<br />


<p>You may add statistics graph if you want</p>

</Box>



<Box sx={{
  border: "10px",
  backgroundColor: "#00b3b3",
  borderRadius: "10px",
  padding: "3%"
}}>
<Typography variant= "h5">
TOTAL NO. OF PATIENTS</Typography>

<h1>{appointmentCount}</h1>

</Box>

</Box>

<Box sx={{
  
  display: "flex",
  flexDirection: "row",
alignItems: "center",
justifyContent: "space-around",
margin: "0% 0% 2% 4%",

'@media (max-width: 950px)': {
  display: "flex",
flexDirection: "column",
alignContent: "space-around"



 }
}}>

<Box sx={{
  
}}>
<Rating name="half-rating " size= "large"  defaultValue={2.5} precision={0.5}  style= {{fontSize: "3rem"}}/>
<h3>Overall Rating</h3>
</Box>
<Box>
       <Typography
          style={{
           
            fontWeight: "bolder",
            paddingLeft: "2rem",
          }}
          variant="h5"
          component="div"
        >
          
          
        </Typography>
        <AccountCircleTwoToneIcon
          style={{
            fontSize: "4rem",
            
          
          }}
          sx={{ color: "#008080", 
          
           }}
        />
        <Rating    value= {value}
  precision= {0.5}
        style ={{

   fontSize : "2.5rem",
        }}

          name="rating"
          // value={value}
          // onChange={handleRatingChange}
          
          
        />
                

        <Typography
          style={{ fontSize: "1.5rem" }}
          variant="body"
          component="div"
        >
          {note}
        </Typography>
      </Box>
 

    </Box>


   </Box>
   
   </>
  )
}

export default Counslor