
import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js';
// import { ChartDateFormatter, ChartEngine } from 'chartjs-adapter-date-fns';

// Register the adapter
// Chart.register(ChartDateFormatter, ChartEngine);


const Counslor = () => {
  const [latestAppointment, setLatestAppointment] = useState([]);
  // const [availabilityId, setAvailabilityId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [latestReview, setLatestReview] = useState(null);



  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAvailabilityIds();
  }, []);


  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));

  // console.log(obj);
  console.log(user);
  const [ratings, setRatings] = useState([]);
  const [reviewNotes, setReviewNotes] = useState([]);
  useEffect(() => {
    fetchRatingsAndReviewNotes();
  }, []);


  const fetchAppointmentCountForAppointment = async () => {
    try {
        const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/2`);
      //${user.id}
        const data = await response.json();


        if (data && data.length > 0) {
          const latestAppointment = data[data.length - 1]; 
          setAppointmentCount(data.length);
          setLatestAppointment(latestAppointment);
      }
    } catch (error) {
        console.error('Error fetching appointment count:', error);
    }

  };

  useEffect(() => {
    fetchAppointmentCountForAppointment();
  }, []);

  const fetchAvailabilityIds = async () => {
    try {
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/2`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const availabilityIds = data.map(availability => availability.id);
          console.log("????????????????", availabilityIds);
          setAvailabilityIds(availabilityIds);
        }
      } else {
        console.error('Error fetching availability IDs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching availability IDs:', error);
    }
  };





  // const fetchAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     const promises = availabilityIds.map(availabilityId =>
  //       fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvail/${availabilityId}`)
  //     );
  //     const responses = await Promise.all(promises);
  //     const appointmentsData = await Promise.all(responses.map(response => response.json()));
  //     const allAppointments = appointmentsData.flat();
  //     console.log("////////////", allAppointments);
  //     setAppointments(allAppointments);
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };

  const fetchAppointmentsByAvailabilityIds = async () => {
    try {
      const promises = availabilityIds.map(availabilityId =>
        fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvail/${availabilityId}`)
      );
      const responses = await Promise.all(promises);
      const appointmentsData = await Promise.all(responses.map(response => response.json()));
      const allAppointments = appointmentsData.flat();
      const appointmentIds = allAppointments.map(appointment => appointment.appointmentId); // Extract appointment IDs
      console.log("////////////", appointmentIds);
      setAppointments(allAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  


  useEffect(() => {
    fetchAppointmentsByAvailabilityIds();
  }, [availabilityIds]);




  const fetchRatingsAndReviewNotes = async () => {
    try {
      const response = await fetch(`http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/all`);
      const data = await response.json();
      console.log(data);
  
      // Filter ratings based on the appointment ID
      const matchedRatings = data.filter(rating => rating.appointmentId === latestAppointment.id);
  
      const matchedRatingsWithReviews = matchedRatings.map(rating => {
        const reviewNote = reviewNotes.find(review => review.ratingId === rating.id);
        console.log(reviewNote);
        return {
          ratingValue: rating.value,
          reviewNote: reviewNote ? reviewNote.note : "",
         
        };
        
      });
     
      console.log( "matchedddd", matchedRatingsWithReviews);
      
      // Calculate the average rating value
      const totalRatingValues = matchedRatingsWithReviews.reduce((sum, rating) => sum + rating.ratingValue, 0);
      const averageRating = totalRatingValues / matchedRatingsWithReviews.length;
      setAverageRating(averageRating);
      console.log("Average Rating:", averageRating);

      const latestReview = matchedRatingsWithReviews[matchedRatingsWithReviews.length - 1];
setLatestReview(latestReview);
console.log( "latest reviewwwwwwssss", latestReview);

      // Use the averageRating value as needed
    } catch (error) {
      console.error('Error fetching ratings and review notes:', error);
    }
  };
  

  // const fetchRatingsAndReviewNotes = async () => {
  //   try {
  //     const response = await fetch(`http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/26`);
  //     const data = await response.json();
  //     console.log(data.value);
  //     setRatings(data.value);

  //     const reviewNotesResponse = await fetch(`http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/26`);
  //     const reviewNotesData = await reviewNotesResponse.json();
  //     setReviewNotes(reviewNotesData.note);
  //     console.log(reviewNotesData.note);
  //   } catch (error) {
  //     console.error('Error fetching ratings and review notes:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAppointmentCount();

  // }, []);

  // const fetchAppointmentCount = async () => {
  //   try {
  //     const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`)
  //     const data = await response.json();
  //     setAppointmentCount(data.length);
  //   } catch (error) {
  //     console.error('Error fetching appointment count:', error);
  //   }
  // };


  // const chartData = {
  //   labels: appointments.map(appointment => appointment.date),
  //   datasets: [
  //     {
  //       label: 'Appointments',
  //       data: appointments.map(appointment => appointment.count),
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     x: {
  //       type: 'time',
  //       time: {
  //         unit: 'day',
  //       },
  //     },
  //   },
  // };
  











  return (
    <>
      <Box
        sx={{
          border: "2px solid green",
          borderRadius: "10px",
          fontFamily: "Quicksand, sans-serif",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "2rem 1rem 1rem 8rem",
        }}
      >

        {/* {availability.length > 0 && ( */}
        <Box
          sx={{
            border: "1px solid green",
            alignSelf: "center",
            borderRadius: "10px",
            width: "60%",
            height: "10%",
            margin: "8% 0% 2% 0%",
            backgroundColor: "#00b3b3",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Today's Appointments</h3>
          {/* {latestAppointment.map((item) => (
              <div key={item.id}> */}
          <p>Date & Time: {<strong>{latestAppointment.date}</strong>} </p>
          <p>Today's Meeting Link: <a href="www.zoom.com">www.zoom.com</a></p>
          {/* </div>
          ))} */}
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
            // backgroundColor: "#00b3b3",
            height: "100%",
            padding: "3%",

            '@media (max-width: 950px)': {
              marginBottom: "1rem",
              alignItems: "center",



            }
          }}>
            <Typography variant="h5">
              WEEKLY APPOINTMENTS
            </Typography>
            <br />

<img src={`${process.env.PUBLIC_URL + '/images/graph.jpg'}`} alt="graph"  
// sx={{width: "100px", height: "100px"}}
style={{width: "400px", height: "300px", borderRadius: "5px"}}
/>
            {/* <Bar key="appointmentsChart" data={chartData} options={chartOptions} /> */}

          </Box>



          <Box sx={{
            border: "10px",
            backgroundColor: "#00b3b3",
            borderRadius: "10px",
            width: "40%",
            // height: "40%",
            padding: "3%"
          }}>
            <Typography variant="h5">
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

<Box sx={{}}>
  {/* <Rating name="half-rating " size="large" value={averageRating} precision={0.5} style={{fontSize: "3rem"}} /> */}
  <Rating name="half-rating-read"
  //  value = {averageRating} 
  defaultValue= {3.5}
   
   precision={0.5} readOnly style= {{fontSize: "2.5rem"}}/>
  <h3>Overall Rating</h3>
</Box>
          {/* <Box>
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
              sx={{
                color: "#008080",

              }}
            />
            {/* <Rating defaultValue={2.5}
              precision={0.5}
              style={{

                fontSize: "2.5rem",
              }}

              name="rating"
            // value={rating}
            // onChange={handleRatingChange}


            /> */}

{/* <Rating value={latestReview.ratingValue} precision={0.5} style={{ fontSize: "2.5rem" }} name="rating"  readOnly/>

            <Typography
              style={{ fontSize: "1.5rem" }}
              variant="body"
              component="div"
            >
              {/* Great experience! Made a same <br />
              day appointment */}
{/* 
               {latestReview.reviewNote}
            </Typography>
          </Box> */}

          {latestReview ? (
  <>
   
            <AccountCircleTwoToneIcon
              style={{
                fontSize: "4rem",
             


              }}
              sx={{
                color: "#008080",
                marginLeft: "5rem"

              }}
            />
    <Rating value={latestReview.ratingValue} precision={0.5} style={{ fontSize: "2.5rem" }} name="rating" readOnly />
    <Typography style={{ fontSize: "1.5rem" }} variant="body" component="div">
      {/* {latestReview.reviewNote} */}
     Great experience! Made a same <br />
              day appointment 

    </Typography>
  </>
) : (
  <Typography variant="body" component="div">
    No review available.
  </Typography>
)}
        </Box>


      </Box>

    </>
  )
}

export default Counslor