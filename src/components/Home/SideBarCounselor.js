import React, { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
const SideBarCounselor = () => {
   const [latestAppointment, setLatestAppointment] = useState([]);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  useEffect(() => {
    if (latestAppointment.date) {
      const [datePart, timePart] = latestAppointment.date.split('T');
      setDate(datePart);
      setTime(timePart.substring(0, 5)); // Extract only the time portion
    }
  }, [latestAppointment]);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem('counselor_data'));
  const fetchAppointmentCountForAppointment = async () => {
    try {
      const response = await fetch(`http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const latestAppointment = data[data.length - 1];
        const availabilityIds = data.map(availability => availability.id);
        console.log("Availabilities ID:", availabilityIds);
        setAvailabilityIds(availabilityIds);
        setAppointmentCount(data.length);
        setLatestAppointment(latestAppointment);
        const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const weeklyAppointments = data.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= oneWeekAgo;
          }).map(appointment=> appointment.date)
          console.log("Weekly Appointments:", weeklyAppointments);
          setWeeklyAppointments(weeklyAppointments);
      }
    } catch (error) {
      console.error('Error fetching appointment count:', error);
    }
  };
   const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
    try {
      const confirmedAppointments = [];
      for (const availabilityId of availabilityIds) {
        const response = await fetch(`http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("data is", data);
          const confirmedAppointmentsData = data.filter(appointment => appointment.confirmed === true);
          confirmedAppointments.push(...confirmedAppointmentsData);
        }
      }
      console.log("Confirmed Appointments:", confirmedAppointments);
      setConfirmedAppointments(confirmedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  useEffect(() => {
    fetchConfirmedAppointmentsByAvailabilityIds();
  }, [availabilityIds]);
  useEffect(() => {
    fetchAppointmentCountForAppointment();
  }, []);
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#8fb3ac',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '102vh',
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        marginTop: '60px',
        '@media (max-width:1600px)': {
          width: '85%',
          height: 'auto',
          marginLeft: '6%',
          position: 'relative',
          marginTop: '-10',
          display: 'none',
        },
      }}
    >
      <h1 style={{marginTop:'-12rem'}}>UpComing Latest Appointment</h1>
      {confirmedAppointments.length > 0 && (
        <div>
          <h3>Confirmed Appointments</h3>
          {confirmedAppointments.map(appointment => (
            <div key={appointment.availabilityId}>
              <Card style={{ margin: '10px', height: '8rem', width: '22rem', borderRadius: '1rem' }}>
             <CalendarMonthRoundedIcon sx={{ color: '#008080', fontSize: '4rem',marginTop:"8px",marginRight:'14rem' }} />
            <p style={{ fontSize: '1.2rem', marginTop: '2rem',marginLeft:"3rem",marginTop:'-4.5rem' }}>Date: {date}</p>
            <p style={{ fontSize: '1.2rem',marginTop:'-10px',marginLeft:"3rem" }}>Time: {time}</p>
              <p>Meeting Link: <a href={appointment.meetingURL}>{appointment.meetingURL}</a></p>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Link to="/availibilitytable">View All</Link>
    </Box>
  );
};
export default SideBarCounselor;