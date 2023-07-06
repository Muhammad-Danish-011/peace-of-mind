import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Link} from "react-router-dom";
// import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SideBarCounselor from './SideBarCounselor';



const Counslor = () => {
  const [latestAppointment, setLatestAppointment] = useState([]);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [confirmedAppointmentsMeetingURLS, setConfirmedAppointmentsMeetingURLS] = useState([]);
 

  const [appointments, setAppointments] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  useEffect(() => {
    fetchAvailabilityIds();
  }, []);

  useEffect(() => {
    if (latestAppointment.date) {
      const [datePart, timePart] = latestAppointment.date.split('T');
      setDate(datePart);
      setTime(timePart.substring(0, 5)); // Extract only the time portion
    }
  }, [latestAppointment]);
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
        console.log(data);
        if (data && data.length > 0) {
          const availabilityIds = data.map(availability => availability.id);
          console.log("Availabilities ID:", availabilityIds);
          setAvailabilityIds(availabilityIds);
    
          // Get weekly appointments
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
          const weeklyAppointments = data.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= oneWeekAgo;
          }).map(appointment=> appointment.date)
    
          console.log("Weekly Appointments:", weeklyAppointments);
          setWeeklyAppointments(weeklyAppointments);
        }
      } else {
        console.error('Error fetching availability IDs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching availability IDs:', error);
    }
  };


  const ChartComponent = () => {
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
  
    return (
      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" stroke="#8884d8" />
      </BarChart>
    );
  };
  // const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     const confirmedAppointments = [];
  //     const upcomingMeetings = [];
  
  //     for (const availabilityId of availabilityIds) {
  //       const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("data is", data);
  //         // Filter appointments where "confirmed" is true
  //         const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true);
  //         confirmedAppointments.push(...confirmedAppointmentsData);
  
  //         // Sort appointments by date in ascending order
  //         const sortedAppointments = confirmedAppointmentsData.sort((a, b) => new Date(a.date) - new Date(b.date));
  //         if (sortedAppointments.length > 0) {
  //           // Get the upcoming appointment
  //           const upcomingAppointment = sortedAppointments[0];
  //           upcomingMeetings.push({
  //             availabilityId,
  //             meetingURL: upcomingAppointment.meetingURL,
  //             date: upcomingAppointment.date
  //           });
  //         }
  //       } else {
  //         throw new Error('Response not OK');
  //       }
  //     }
  
  //     console.log("Confirmed Appointments:", confirmedAppointments);
  //     console.log("Upcoming Meetings:", upcomingMeetings);
  
  //     const confirmedAppointmentIds = confirmedAppointments.map(appointment => appointment.availabilityId);
  //     const confirmedAppointmentsMeetingURLS = confirmedAppointments.map(appointment => appointment.meetingURL);
  
  //     setConfirmedAppointmentsMeetingURLS(confirmedAppointmentsMeetingURLS);
  
  //     console.log("Confirmed meeting URLs are: ", confirmedAppointmentsMeetingURLS);
  //     console.log("Confirmed Appointment's Availability Ids:", confirmedAppointmentIds); // matched appointments availability ids
  
  //     // Use the confirmedAppointments array and upcomingMeetings array as needed
  //     if (confirmedAppointments.length > 0) {
  //       const appointments = confirmedAppointments.map(appointment => ({
  //         patientid: appointment[0].patientid,
  //         id: appointment[0].id
  //       }));
  //       const uniquePatientIds = [...new Set(appointments.map(appointment => appointment.patientid))];
  //       setPatientCount(uniquePatientIds.length);
  //       console.log("Total number of patients:", uniquePatientIds.length);
  //       setAppointments(appointments);
  //       setAppointmentsId(appointments.map(appointment => appointment.id));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };
  useEffect(() => {
    // fetchAppointmentsByAvailabilityIds();
    fetchConfirmedAppointmentsByAvailabilityIds();
  }, [availabilityIds]);
  const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
    try {
      const confirmedAppointments = [];
      for (const availabilityId of availabilityIds) {
        const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Data is", data);
          // Filter appointments where "confirmed" is true
          const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true);
          confirmedAppointments.push(...confirmedAppointmentsData);
        }
      }
      console.log("Confirmed Appointments:", confirmedAppointments);
      const confirmedAppointmentIds = confirmedAppointments.map(appointment => appointment.availabilityId);
      const confirmedAppointmentsMeetingURLS = confirmedAppointments.map(appointment => appointment.meetingURL);
      setConfirmedAppointmentsMeetingURLS(confirmedAppointmentsMeetingURLS);
      const relativeDates = confirmedAppointmentIds.map(appointmentId => {
        const matchedAppointment = availabilityIds.find(availabilityId => availabilityId === appointmentId);
        if (matchedAppointment) {
          const matchedAppointmentIndex = availabilityIds.indexOf(matchedAppointment);
          console.log("===============",weeklyAppointments[matchedAppointmentIndex]);
          return weeklyAppointments[matchedAppointmentIndex];
        }
        return null;
      });
      console.log("Relative Dates:", relativeDates);
      console.log("Confirmed Meeting URLs:", confirmedAppointmentsMeetingURLS);
      console.log("Confirmed Appointment's Availability IDs:", confirmedAppointmentIds);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  // const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     const confirmedAppointments = [];
  //     for (const availabilityId of availabilityIds) {
        
  //       const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("data is", data);
  //         // Filter appointments where "confirmed" is true
  //         const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true );
  //         // const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed);
  //         confirmedAppointments.push(...confirmedAppointmentsData);
  //       }
  //     }
  //     console.log("Confirmed Appointments:", confirmedAppointments);
  //     const confirmedAppointmentIds = confirmedAppointments.map(appointment => appointment.availabilityId);
  //     const confirmedAppointmentsMeetingURLS = confirmedAppointments.map(appointment => appointment.meetingURL);
  //     const date = confirmedAppointmentIds.map(appointment=>appointment.weeklyAppointments);
  //     setConfirmedAppointmentsMeetingURLS(confirmedAppointmentsMeetingURLS);
  //     console.log("Confirmed dates ", date);
  //     console.log("Confirmed meeting URLS are: ", confirmedAppointmentsMeetingURLS);
  //     console.log("Confirmed Appointment's Availability Ids:", confirmedAppointmentIds); //matched appointments availability ids
  //     // Use the confirmedAppointments array as needed
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };

  // const fetchAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     const confirmedAppointments = [];
  //     for (const availabilityId of availabilityIds) {
  //       const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("data is", data);
  //         // Filter appointments where "confirmed" is true and availability matches
  //         const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true && appointment.availabilityId === availabilityId);
  //         confirmedAppointments.push(...confirmedAppointmentsData);
  //       }
  //     }
  //     console.log("Confirmed Appointments:", confirmedAppointments);
  //     // Use the confirmedAppointments array as needed
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };
  // const fetchAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     const confirmedAppointments = [];
  //     for (const availabilityId of availabilityIds) {
  //       const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("data is", data);
  //         // Filter appointments where "confirmed" is true and availability matches
  //         const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true && appointment.availabilityId === availabilityId);
  //         confirmedAppointments.push(...confirmedAppointmentsData);
  //       }
  //     }
  //     console.log("Confirmed Appointments:", confirmedAppointments);
  //     // Use the confirmedAppointments array as needed
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };


  // const fetchAppointmentsByAvailabilityIds = async () => {
  //   try {
  //     availabilityIds.map(availabilityId =>
  //     fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`)
  //     .then(response => {
  //       if(response.ok){
  //         return response.json();
          
  //       }
  //     })
  //     .then(data => {
  //       if(data){
  //         setAppointments(appointments => [...appointments,data]);
  //       }
  //     })
  //     );
  //     let arr = Array();
  //     appointments.map(a=> arr.push(a[0].patientid));
  //     appointments.map(a=> setAppointmentsId(appointmentId => [...appointmentId,a[0].id]));

  //     arr = [... new Set(arr)];
  //     //console.log("Total number of patients:", arr.length);
  //     setPatientCount(arr.length);
  //   } catch (error) {
  //       console.error('Error fetching appointments:', error);
  //   }
  // };

// useEffect(() => {
//   fetchAppointmentsByAvailabilityIds();
// }, [availabilityIds]);

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
        }}
      >
        <h3>Upcoming Latest Appointment</h3>
        <p>Date  <strong>{latestAppointment.date}</strong></p>
        <p>Time  <strong>{latestAppointment.time}</strong></p>
        <p>Today's Meeting Link: <Link to={latestAppointment.meetingURL}>{confirmedAppointmentsMeetingURLS}</Link></p>
       
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
        <Box sx={{
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
          <ChartComponent />
        </Box>
        <Box sx={{
        
          border: "1px solid green",
          backgroundColor: 'rgb(207,227,223)',
          borderRadius: "10px",
          width: "20%",
      
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
     
        justifyContent: "center",
        margin: "1% 20% 0% 0%",

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
       
      </Box>

      </Box>
    </Box>

  </>
)
}

export default Counslor