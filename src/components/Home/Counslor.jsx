import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Rating,CircularProgress } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Link } from "react-router-dom";
// import moment from 'moment';
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SideBarCounselor from './SideBarCounselor';
import moment from 'moment';


const Counslor = () => {
  const [latestAppointment, setLatestAppointment] = useState([]);
  // const [averageRating, setAverageRating] = useState(0);
  // const [latestReview, setLatestReview] = useState(null);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [confirmedAppointmentsMeetingURLS, setConfirmedAppointmentsMeetingURLS] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [patientCount, setPatientCount] = useState(0);  
  const [relativeDates,setRelativeDate]=useState();
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
  const [appointmentId, setAppointmentsId] = useState([])
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    if(availabilityIds.length===0)
       fetchAvailabilityIds();
  }, [availabilityIds]);
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
        console.log(data);
        if (data && data.length > 0) {
          const availabilityIds = data.map(availability => availability.id);
          console.log("Availabilities ID:", availabilityIds);
          setAvailabilityIds(availabilityIds);
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

          const weeklyAppointments = data.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= oneWeekAgo;
          }).map(appointment=> appointment.date)
          console.log("Weekly Appointments:", weeklyAppointments);
          setWeeklyAppointments(weeklyAppointments);
        }
        setLoading(false);
      } else {
        console.error('Error fetching availability IDs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching availability IDs:', error);
      setLoading(false);
    }
  };


  const ChartComponent =  useCallback(() => {
    // Calculate the number of appointments for each week
    const countByDate = weeklyAppointments.reduce((counts, date) => {
      counts[date] = (counts[date] || 0) + 1;
      return counts;
    }, {});
    // Convert the appointment data to an array of objects
    const chartData = Object.entries(countByDate).map(([date, count]) => ({
      date,
      count
    }));
    let mydata = [];
    chartData.map((a) => {
      let arr = { "date": new Date(a.date).getDate() + "/" + new Date(a.date).getMonth(), "count": a.count }
      mydata.push(arr);
    })

    return (
      <BarChart width={400} height={300} data={mydata}>
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar style={{ width: '1px' }} dataKey="count" stroke="#8884D8" />
    </BarChart>

    );
  },[weeklyAppointments]);
  useEffect(() => {
    const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
      setLoading(true);
      try {
        const confirmedAppointments = [];
        for (const availabilityId of availabilityIds) {
          const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId} `);
          if (response.ok) {
            const data = await response.json();
            console.log("Data is", data);
            const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true);
            confirmedAppointments.push(...confirmedAppointmentsData);
          }
        }
        console.log("Confirmed Appointments:", confirmedAppointments);
  
        const confirmedAppointmentIds = confirmedAppointments.map(appointment => appointment.availabilityId);
        const confirmedAppointmentsMeetingURLS = confirmedAppointments.map(appointment => appointment.meetingURL);
        setConfirmedAppointmentsMeetingURLS(confirmedAppointmentsMeetingURLS);
        setConfirmedAppointments(confirmedAppointments);
        const relativeDates = confirmedAppointmentIds.map(appointmentId => {
          const matchedAppointment = availabilityIds.find(availabilityId => availabilityId === appointmentId);
  
          if (matchedAppointment) {
            const matchedAppointmentIndex = availabilityIds.indexOf(matchedAppointment);
            console.log("===============",weeklyAppointments);
            let dateNow = moment().format('YYYY-MM-DDTHH:MM:SS');
            console.log(dateNow);
  
            return weeklyAppointments[matchedAppointmentIndex];
          }
          return null;
        });
        setRelativeDate(relativeDates);
        setLoading(false); // Set loading to false after setting all the data
        console.log("Relative Dates:", relativeDates);
        console.log("Confirmed Meeting URLs:", confirmedAppointmentsMeetingURLS);
        console.log("Confirmed Appointment's Availability IDs:", confirmedAppointmentIds);
  
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchConfirmedAppointmentsByAvailabilityIds();
  }, [confirmedAppointments]);
  
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

let appointmentDate = undefined;
let appointmentTime = undefined;
let meetingURL = undefined;

if(relativeDates){
  if(relativeDates.length!==0){
    meetingURL = confirmedAppointments[0].meetingURL;
    const relativeDateSorted = relativeDates.sort((a,b)=>a-b);
    appointmentDate = relativeDateSorted[0].split('T')[0] || '';
    appointmentTime = relativeDateSorted[0].split('T')[1]?.substring(0, 5) || '';
  }
}
return (
  <>

  <Box>
    <SideBarCounselor/>
  
    <Box
      sx={{
        fontFamily: "Quicksand, sans-serif",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",   
      }}
    >
      {/* <Box
        sx={{
          border: "1px solid green",
          borderRadius: "10px",
          width: "25%",
          height: "30%",
          margin: "8% 0% 0% 30%",
          backgroundColor: 'rgb(207,227,223)',
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }} 
      >
      <div>
      <h1
      sx={{
        fontSize: "1.5rem",
        '@media (max-width: 950px)': {
          fontSize: "1rem",
          textAlign: "center",
        }
      }}
    > Upcoming Latest Appointments</h1>
        <p>Date: {appointmentDate}</p>
        <p>Time: {appointmentTime}</p>
        <p>
          Meeting Link: <Link to={meetingURL}>{meetingURL}</Link>
        </p>
      </div>
    

      </Box> */}

<Box
  sx={{
    border: "1px solid green",
    borderRadius: "10px",
    width: "25%",
    height: "30%",
    margin: "8% 0% 0% 30%",
    backgroundColor: 'rgb(207,227,223)',
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",

    '@media (max-width: 950px)': {
      width: "80%",
      margin: "2rem auto",
      padding: "1rem",
    }
  }}
>
  <div>
    <h1
      sx={{
        fontSize: "1.5rem",
        '@media (max-width: 950px)': {
          fontSize: "1rem",
          textAlign: "center",
        }
      }}
    >
      Upcoming Latest Appointments
    </h1>
    <p>Date: {appointmentDate}</p>
    <p>Time: {appointmentTime}</p>
    <p>
      Meeting Link: <Link to={meetingURL}>{meetingURL}</Link>
    </p>
  </div>
</Box>


      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-evenly",
        alignItems: "center",
      

        '@media (max-width: 950px)': {
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around"
        }
      }}>
        {/* <Box sx={{
          borderRadius: "10px",
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
          <ChartComponent /> */}
          <Box
  sx={{
    borderRadius: "10px",
    height: "100%",
    padding: "3%",

    '@media (max-width: 950px)': {
      marginBottom: "1rem",
      alignItems: "center",
      width: "100%",
      height: "auto",
    }
  }}
>
  <Typography variant="h5">
    WEEKLY APPOINTMENTS
  </Typography>
  <br />
  <ChartComponent
    width={400}
    height={300}
    // data={mydata}
    sx={{
      '@media (max-width: 950px)': {
        width: "100%",
        height: "auto",
      }
    }}
  ></ChartComponent>
        </Box>
        <Box sx={{
        
          border: "1px solid green",
          backgroundColor: 'rgb(207,227,223)',
          borderRadius: "10px",
          width: "20%",
      
          padding: "3%",
          '@media (max-width: 950px)': {
            width: "80%",
            alignSelf: "center",
            margin: "2rem auto",
            padding: "1rem",
          }
        }}>
          
          <Typography variant="h5">
            TOTAL NO. OF PATIENTS</Typography>
          <h1>{patientCount}</h1>

        </Box>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "1% 20% 0% 0%",
        '@media (max-width: 950px)': {
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around"
        }
      }}>
        <Box>
          <Rating name="half-rating-read"
            value={2}
            data-testid="ratings"
            precision={0.5} readOnly style={{ fontSize: "2.5rem" }} />
          <h3>Overall Rating</h3>
        </Box>
      </Box>
      </Box>
    </Box>

  </>
)
}

export default Counslor;