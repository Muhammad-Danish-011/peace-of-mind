import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Rating} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SideBarCounselor from './SideBarCounselor';
import moment from 'moment';
import { Abc } from '@mui/icons-material';


const Counslor = () => {
  const [latestAppointment, setLatestAppointment] = useState([]);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [confirmedAppointmentsMeetingURLS, setConfirmedAppointmentsMeetingURLS] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [relativeDates, setRelativeDate] = useState();
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY;
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [random, setRandom] = useState(null);
  const [ noAppointment, setNoAppoinment ] = useState(null);

  const now =moment();
  let nextAppointmentIndex = 0;
  useEffect(() => {
    if (availabilityIds.length === 0 && random !== null)
      fetchAvailabilityIds();
  }, [random]);

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
              setRandom('agaya bhai');
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
    if (random) {
      fetchAppointmentCountForAppointment();
    }
  }, [random]);

  const fetchAvailabilityIds = async () => {
    try {
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`);
      if (response.ok) {
        const data = await response.json();
        if(data.length === 0){
          setNoAppoinment(true);
        }

        if (data && data.length > 0) {
          const availabilityIds = data.map(availability => availability.id);
          setAvailabilityIds(availabilityIds);
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
          const weeklyAppointments = data.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= oneWeekAgo;
          }).map(appointment => appointment.date)
          setWeeklyAppointments(weeklyAppointments);
          
          // Fetch appointments by availability IDs
          fetchAppointmentsByAvailabilityIds(availabilityIds);
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
  
  const fetchAppointmentsByAvailabilityIds = async (availabilityIds) => {
    try {
      const promises = availabilityIds?.map(availabilityId =>
        fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
      );
  
      const appointmentResponses = await Promise.all(promises).catch((er)=>{
        // console.log('something')
      });
      let myData = [];
      appointmentResponses?.forEach(data => {
        if (data.length > 0) {
          data.forEach(item => {
            myData.push(item);
          });
        }
      });
  
      let arr = Array();
      myData.forEach(a => {
        arr.push(a.patientid);
      });
      setPatientCount([...new Set(arr)].length);
  
      // Update appointments state
      setAppointments(myData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  

  const ChartComponent = useCallback(() => {
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
      <BarChart width={400} height={300} data={mydata} sx={{'@media (max-width: 950px)': {
        width: "60%",
        marginLeft:"-10%",
        margin: "2rem auto",
        padding: "1rem"
      }}}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar style={{ width: '1px' }} dataKey="count" stroke="#8884D8" />
      </BarChart>

    );
  }, [weeklyAppointments]);
  useEffect(() => {
    if (random) {
      const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
        setLoading(true);
        try {
          const promises = availabilityIds.map(availabilityId =>
            fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId} `)
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
              })
          );
      
          const appointmentResponses = await Promise.all(promises);
          const confirmedAppointments = appointmentResponses
            .reduce((acc, data) => [...acc, ...data], [])
            .filter(appointment => appointment.confirmed === true);
          const confirmedAppointmentIds = confirmedAppointments.map(appointment => appointment.availabilityId);
          const confirmedAppointmentsMeetingURLS = confirmedAppointments.map(appointment => appointment.meetingURL);
          setConfirmedAppointmentsMeetingURLS(confirmedAppointmentsMeetingURLS);
          setConfirmedAppointments(confirmedAppointments);
          
          const relativeDates = confirmedAppointmentIds.map(appointmentId => {
            const matchedAppointment = availabilityIds.find(availabilityId => availabilityId === appointmentId);
      
            if (matchedAppointment) {
              const matchedAppointmentIndex = availabilityIds.indexOf(matchedAppointment);

              let dateNow = moment().format('YYYY-MM-DDTHH:MM:SS');
      
              return weeklyAppointments[matchedAppointmentIndex];
            }
            return null;
          });
          setRelativeDate(relativeDates);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching appointments:', error);
          setLoading(false);
        }
      };
      
      fetchConfirmedAppointmentsByAvailabilityIds();
    }
  }, [confirmedAppointments.length > 0, weeklyAppointments.length > 0, random]);
  useEffect(() => {
    if (random) {
      fetchAppointmentsByAvailabilityIds();
    }
  }, [availabilityIds, random])
  confirmedAppointments.sort((a, b) => {
    const aDate = weeklyAppointments[availabilityIds.indexOf(a.availabilityId)];
    const bDate = weeklyAppointments[availabilityIds.indexOf(b.availabilityId)];
    return aDate.localeCompare(bDate);
  });


  return (
    <>

      <Box>
        {
          random &&
          <SideBarCounselor noAppointment={noAppointment} />

        }

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
    width: "36%",
    height: "30%",
    margin: "8% 0% 0% 25%",
    backgroundColor: 'rgb(207,227,223)',
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",

    '@media (max-width: 950px)': {
      width: "60%",
      marginLeft:"-10%",
      margin: "2rem auto",
      padding: "1rem"
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

    {
      noAppointment && <h3>No Appointment today</h3>
    }

    { 
  confirmedAppointments
    .filter((appointment) => appointment)
    .sort((a, b) => {
      const aDate = weeklyAppointments[availabilityIds.indexOf(a.availabilityId)];
      const bDate = weeklyAppointments[availabilityIds.indexOf(b.availabilityId)];
      return moment(aDate).diff(moment(bDate));
    })
    .filter((appointment) => {
      const confirmedAppointmentId = appointment?.availabilityId;
      const matchedAppointmentIndex = availabilityIds.indexOf(confirmedAppointmentId);
      const appointmentDate = weeklyAppointments[matchedAppointmentIndex]?.split("T")[0] || "";
      const appointmentTime = weeklyAppointments[matchedAppointmentIndex]?.split("T")[1]?.substring(0, 5) || "";

      const appointmentDateTime = moment(`${appointmentDate}T${appointmentTime}`);

      return appointmentDateTime.isAfter(now);
    })
    .slice(0, 1) // Display only the first upcoming appointment
    .map((appointment) => {
      const confirmedAppointmentId = appointment?.availabilityId;
      const matchedAppointmentIndex = availabilityIds.indexOf(confirmedAppointmentId);
      const appointmentDate = weeklyAppointments[matchedAppointmentIndex]?.split("T")[0] || "";
      const appointmentTime = weeklyAppointments[matchedAppointmentIndex]?.split("T")[1]?.substring(0, 5) || "";

      return (
        <div key={confirmedAppointmentId}>
          <p style={{ fontSize: "1.4rem", marginLeft: "-3rem", marginTop: "2rem" }}>
            <strong>Date:</strong> {appointmentDate}
          </p>
          <p style={{ fontSize: "1.4rem", marginTop: "-10px", marginLeft: "-3rem" }}>
            <strong>Time:</strong> {appointmentTime}
          </p>
          <p>
            <strong>Meeting Link: </strong>
            <a href={appointment?.meetingURL}>{appointment?.meetingURL}</a>
          </p>
        </div>
      );
    })
}

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