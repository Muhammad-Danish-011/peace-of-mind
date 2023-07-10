import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";


export const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  const Nav = useNavigate();
  const patientId = JSON.parse(sessionStorage.getItem('patient_data')).data.id

  useEffect(() => {
    fetch(
      //"http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall"
       // "http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByAvail/209"
      `http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByPatientid/${patientId}`
    )
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.log(error));
  
    fetch(
     "http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/all"
      )
      .then((response) => response.json())
      .then((data) => setAvailabilityData(data))
      .catch((error) => console.log(error));
  }, []);

  const getAvailabilityDate = (availabilityId) => {
    const availability = availabilityData.find((item) => item.id === availabilityId);
    return availability ? availability.date : "";
  };

  const getPendingStatus = (date) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const rowDate = new Date(date).toISOString().split("T")[0];

    // const currentDate = new Date();
    // const rowDate = new Date(date);

    if (rowDate < currentDate) {
      return "Past";
    } else if (rowDate === currentDate) {
      return "Today";
    } else {
      return "Future";
    }
  };
 
  const handleJoin = (appointment_id) => {
    // Handle join logic here
    Nav(`/room/${appointment_id}`);
  };
 

  const filteredAppointments = appointments.filter((appointment) => {
    const matchingAvailability = availabilityData.find(
      (item) => item.id === appointment.availabilityId
    );
    
    if (matchingAvailability) {
      const appointmentDate = getAvailabilityDate(appointment.availabilityId);
      const currentDate = new Date().toISOString().split("T")[0];
  
      return appointmentDate >= currentDate && appointment.confirmed===false;

    }
    
    return false;
  });

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = getAvailabilityDate(a.availabilityId);
    const dateB = getAvailabilityDate(b.availabilityId);
    return new Date(dateB) - new Date(dateA);
  });

  const formatDateTime = (date) => {
    const dateTime = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };
    return dateTime.toLocaleString("en-US", options);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Box sx={{ minWidth: 650, overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#a0d4d4",
                    color: "#000000",
                    fontWeight: "600",
                    borderBottom: "0px solid #ffffff",
                    textAlign: "center",
                  }}
                >
                  Appointment ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#a0d4d4",
                    color: "#000000",
                    fontWeight: "600",
                    borderBottom: "0px solid #ffffff",
                    textAlign: "center",
                  }}
                >
                  Appointment Date 
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#a0d4d4",
                    color: "#000000",
                    fontWeight: "600",
                    borderBottom: "0px solid #ffffff",
                    textAlign: "center",
                  }}
                >
                  Pending Status
                </TableCell>
                {/* <TableCell
                  sx={{
                    backgroundColor: "#a0d4d4",
                    color: "#000000",
                    fontWeight: "600",
                    borderBottom: "0px solid #ffffff",
                    textAlign: "center",
                  }}
                >
                  Confirmation
                </TableCell> */}
                {/* <TableCell
                  sx={{
                    backgroundColor: "#a0d4d4",
                    color: "#000000",
                    fontWeight: "600",
                    borderBottom: "0px solid #ffffff",
                    textAlign: "center",
                  }}
                >
                  Session
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAppointments.length > 0 ? sortedAppointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  sx={{
                    "&:last-child td": { borderBottom: 0 },
                    "&:hover": { backgroundColor: "#daf2f2" },
                    "&:hover td": { backgroundColor: "inherit" },
                  }}
                >
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      borderRight: "1px solid #000000",
                    }}
                  >
                    {appointment.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      borderRight: "1px solid #000000",
                    }}
                  >
                    {formatDateTime(
                      getAvailabilityDate(appointment.availabilityId)
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      borderRight: "1px solid #000000",
                    }}
                  >
                    {getPendingStatus(
                      getAvailabilityDate(appointment.availabilityId)
                    )}
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {getPendingStatus(
                      getAvailabilityDate(appointment.availabilityId)
                    ) === "Future" ||
                    getPendingStatus(
                      getAvailabilityDate(appointment.availabilityId)
                    ) === "Today" ? (
                      <Button
                        disabled={!appointment.confirmed}
                        onClick={() => handleJoin(appointment.id)}
                        variant="outlined"
                        color="primary"
                        sx={{ marginLeft: "8px" }}
                      >
                        Join
                      </Button>
                    ) : null}
                  </TableCell> */}
                </TableRow>
              )): <h4 style={{display: "flex", justifyContent: "center", width: "100%", alignItem: "center"}}>No Appointment</h4>}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default PendingAppointments;