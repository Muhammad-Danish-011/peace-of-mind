import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const PreviousAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  const Nav = useNavigate();

  useEffect(() => {
    fetch("http://appointment.us-west-2.elasticbeanstalk.com/appointments/getByPatientid/160")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.log(error));

    fetch("http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/all")
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
    console.log(date);
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
    Nav(`/room/${appointment_id}`);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchingAvailability = availabilityData.find(
      (item) => item.id === appointment.availabilityId
    );
    const appointmentDate = getAvailabilityDate(appointment.availabilityId);
    const currentDate = new Date().toISOString().split("T")[0];
    return (
      matchingAvailability !== undefined &&
      new Date(appointmentDate).toISOString().split("T")[0] < currentDate
    );
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
      <TableContainer component={Paper} sx={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}>
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
                  Session
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAppointments.map((appointment) => (
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
                    {formatDateTime(getAvailabilityDate(appointment.availabilityId))}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      borderRight: "1px solid #000000",
                    }}
                  >
                    {getPendingStatus(getAvailabilityDate(appointment.availabilityId))}
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      borderBottom: "1px solid #f5f5f5",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {getPendingStatus(getAvailabilityDate(appointment.availabilityId)) ===
                    "Future" ? (
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
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default PreviousAppointments;