import React from 'react';
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UpcomingAppointment = ({ appointmentDate, appointmentTime, meetingURL }) => {
  return (
    <Box
      sx={{
        border: "1px solid green",
        borderRadius: "10px",
        width: "25%",
        height: "30%",
        margin: "8% 0% 0% 30%",
        backgroundColor: 'rgb(207, 227, 223)',
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
  );
};

export default UpcomingAppointment;
