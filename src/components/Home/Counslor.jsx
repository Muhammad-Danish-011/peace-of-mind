import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const Counslor = () => {
  const [latestAppointment, setLatestAppointment] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [latestReview, setLatestReview] = useState(null);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  useEffect(() => {
    fetchAvailabilityIds();
  }, []);

  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
  const [appointmentId, setAppointmentsId] = useState([])
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    fetch(
      `${accountUrl}/user/get/${user?.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.role === "COUNSELOR") {
          fetch(
            `${councelorUrl}/counselor/get/${user.id}`
          )
            .then((response) => response.json())
            .then((counselorData) => {
              console.log('-------======--', counselorData);
              // setSpecialization(counselorData.specialization);
              // setDescription(counselorData.description);
              sessionStorage.setItem("counselor_data", JSON.stringify(counselorData))
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  }, []);
  const fetchAppointmentCountForAppointment = async () => {
    try {
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`);
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
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const availabilityIds = data.map(availability => availability.id);
          console.log("Availibilities ID", availabilityIds);
          setAvailabilityIds(availabilityIds);
        }
      } else {
        console.error('Error fetching availability IDs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching availability IDs:', error);
    }
  };
  const fetchAppointmentsByAvailabilityIds = async () => {
    try {
      availabilityIds.map(availabilityId =>
      fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`)
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then(data => {
        if(data){
          setAppointments(appointments => [...appointments,data]);
        }
      })

      );
      let arr = Array();
      appointments.map(a=> arr.push(a[0].patientid));
      appointments.map(a=> setAppointmentsId(appointmentId => [...appointmentId,a[0].id]));

      arr = [... new Set(arr)];
      //console.log("Total number of patients:", arr.length);
      setPatientCount(arr.length);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
  };

useEffect(() => {
  fetchAppointmentsByAvailabilityIds();
}, [availabilityIds]);

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
            style={{ width: "400px", height: "300px", borderRadius: "5px" }}
          />

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
          <h1>{patientCount}</h1>

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
          <Rating name="half-rating-read"
            value={2}
            data-testid="ratings"
            precision={0.5} readOnly style={{ fontSize: "2.5rem" }} />
          <h3>Overall Rating</h3>
        </Box>
        {latestReview ? (
          <>

            <AccountCircleTwoToneIcon
              style={{
                fontSize: "4rem",
                // marginLeft:'25rem',



              }}
              sx={{
                color: "#008080",
                marginLeft: "5rem"

              }}
            />
            <Rating value={latestReview.ratingValue} precision={0.5} style={{ fontSize: "2.5rem" }} name="rating" readOnly />
            <Typography style={{ fontSize: "1.5rem" }} variant="body" component="div">
              {latestReview.reviewNote}
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