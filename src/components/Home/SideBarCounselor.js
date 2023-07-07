import React, { useEffect, useState } from "react";
// import { Box, Card, CircularProgress } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
// import moment from "moment";
// import React, { useState } from "react";
import { Box, Card, CircularProgress, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

const SideBarCounselor = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState([]);
  const [availabilityIds, setAvailabilityIds] = useState([]);
  const [date, setDate] = useState("");
  const [relativeDates, setRelativeDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [
    confirmedAppointmentsMeetingURLS,
    setConfirmedAppointmentsMeetingURLS,
  ] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [appointmentCount, setAppointmentCount] = useState(0);
  const obj = JSON.parse(sessionStorage.getItem("counselor_data"));


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const fetchAppointmentCountForAppointment = async () => {
    try {
      const response = await fetch(
        `http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const latestAppointment = data[data.length - 1];
        const availabilityIds = data.map((availability) => availability.id);
        setAvailabilityIds(availabilityIds);
        setAppointmentCount(data.length);
        setLatestAppointment(latestAppointment);
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weeklyAppointments = data
          .filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= oneWeekAgo;
          })
          .map((appointment) => appointment.date);
        setWeeklyAppointments(weeklyAppointments);
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching appointment count:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    const fetchConfirmedAppointmentsByAvailabilityIds = async () => {
      try {
        const confirmedAppointments = [];
        for (const availabilityId of availabilityIds) {
          const response = await fetch(
            `http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvailability/${availabilityId}`
          );
          if (response.ok) {
            const data = await response.json();
            const confirmedAppointmentsData = data.filter(
              (appointment) => appointment.confirmed === true
            );
            confirmedAppointments.push(...confirmedAppointmentsData);
          }
        }
        setConfirmedAppointmentsMeetingURLS(
          confirmedAppointments.map((appointment) => appointment.meetingURL)
        );
        setConfirmedAppointments(confirmedAppointments);

        const relativeDates = confirmedAppointments.map((appointment) => {
          const matchedAppointment = availabilityIds.find(
            (availabilityId) => availabilityId === appointment.availabilityId
          );
          if (matchedAppointment) {
            const matchedAppointmentIndex =
              availabilityIds.indexOf(matchedAppointment);
            return {
              appointmentDate:
                weeklyAppointments[matchedAppointmentIndex]?.split("T")[0] ||
                "",
              appointmentTime:
                weeklyAppointments[matchedAppointmentIndex]
                  ?.split("T")[1]
                  ?.substring(0, 5) || "",
              relativeDate: weeklyAppointments[matchedAppointmentIndex],
            };
          }
          return null;
        });

        relativeDates.sort((a, b) =>
          a.relativeDate.localeCompare(b.relativeDate)
        );
        setRelativeDate(relativeDates);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchConfirmedAppointmentsByAvailabilityIds();
  }, [availabilityIds]);

  useEffect(() => {
    fetchAppointmentCountForAppointment();
  }, []);

  confirmedAppointments.sort((a, b) => {
    const aDate = weeklyAppointments[availabilityIds.indexOf(a.availabilityId)];
    const bDate = weeklyAppointments[availabilityIds.indexOf(b.availabilityId)];
    return aDate.localeCompare(bDate);
  });

  return (

    <Box>
    <IconButton
      onClick={toggleMenu}
      sx={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: {
          xs: "block",
          sm: "none",
        },
      }}
    >
      {menuOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
    <Box
     sx={{
      p: 2,
      backgroundColor: "#8fb3ac",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "102vh",
      position: "absolute",
      top: 0,
      right: 0,
      width: "400px",
      marginTop: "60px",
      "@media (max-width: 1600px)": {
        width: "85%",
        height: "auto",
        marginLeft: "6%",
        position: "relative",
        marginTop: "-10",
        display: menuOpen ? "flex" : "none",
      },
      "@media (max-width: 768px)": {
        width: "100%",
        marginTop: "0",
        marginRight: "0",
          },
        }}
        
      >
      <h1 style={{ marginTop: "-12rem" }}>Upcoming Latest Appointment</h1>
      {loading ? ( // Render loader when loading is true
        <CircularProgress />
      ) : (
        <>
          <div>
            <h3>Confirmed Appointments</h3>
            {confirmedAppointments.map((appointment) => {
              const confirmedAppointmentId = appointment.availabilityId;
              const matchedAppointmentIndex = availabilityIds.indexOf(
                confirmedAppointmentId
              );
              const appointmentDate =
                weeklyAppointments[matchedAppointmentIndex]?.split("T")[0] ||
                "";
              const appointmentTime =
                weeklyAppointments[matchedAppointmentIndex]
                  ?.split("T")[1]
                  ?.substring(0, 5) || "";
              return (
                <div key={confirmedAppointmentId}>
                  <Card
                    style={{
                      margin: "10px",
                      height: "8rem",
                      width: "22rem",
                      borderRadius: "1rem",
                    }}>
                    <CalendarMonthRoundedIcon
                      sx={{
                        color: "#008080",
                        fontSize: "4rem",
                        marginTop: "8px",
                        marginRight: "14rem",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "1.2rem",
                        marginLeft: "3rem",
                        marginTop: "-4.5rem",
                      }}>
                      Date: {appointmentDate}
                    </p>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        marginTop: "-10px",
                        marginLeft: "3rem",
                      }}>
                      Time: {appointmentTime}
                    </p>
                    <p>
                      Meeting Link:{" "}
                      <a href={appointment.meetingURL}>
                        {appointment.meetingURL}
                      </a>
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
          <Link to="/availibilitytable">View All</Link>
        </>
      )}
    </Box>
    </Box>
  );
};

export default SideBarCounselor;
