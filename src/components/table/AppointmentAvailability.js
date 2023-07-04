// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Box,
// } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   backgroundColor: "#a0d4d4",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: "10px",
// };

// const AvailabilityTable = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [availabilityData, setAvailabilityData] = useState([]);
//   const [acceptedAppointments, setAcceptedAppointments] = useState([]);
//   const obj = JSON.parse(sessionStorage.getItem('counselor_data'));

//   useEffect(() => {
//     fetch(
//       "http://appointment.us-west-2.elasticbeanstalk.com/appointments/getall"
//     )
//       .then((response) => response.json())
//       .then((data) => setAppointments(data))
//       .catch((error) => console.log(error));

//     fetch(
//       `http://avalaibiliyapp-env.eba-mf43a3nx.us-west-2.elasticbeanstalk.com/availability/counselor/${obj.id}`
//     )
//       .then((response) => response.json())
//       .then((data) => setAvailabilityData(data))
//       .catch((error) => console.log(error));
//   }, []);

//   const getAvailabilityDate = (availabilityId) => {
//     const availability = availabilityData.find(
//       (item) => item.id === availabilityId
//     );
//     return availability ? availability.date : "";
//   };

//   const getPendingStatus = (date) => {
//     const currentDate = new Date().toISOString().split("T")[0];
//     const rowDate = new Date(date).toISOString().split("T")[0];

//     if (rowDate < currentDate) {
//       return "Past";
//     } else if (rowDate === currentDate) {
//       return "Today";
//     } else {
//       return "Future";
//     }
//   };

//   const handleAccept = () => {
//     console.log("Accepting appointment", acceptedAppointments);

//     let obj = {
//       ...acceptedAppointments,
//       meetingURL: meetifyURL,
//       confirmed: true,
//     };

//     console.log("obj", obj);

//     try {
//       fetch(
//         `http://appointment.us-west-2.elasticbeanstalk.com/appointments/update`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(obj),
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           // Handle success response
//           console.log(`Appointment with ID ${data} has been accepted.`);

//           const updatedAppointments = appointments.map((appointment) => {
//             if (appointment.id === obj.id) {
//               return {
//                 ...appointment,
//                 confirmed: true,
//                 meetingURL: meetifyURL,
//               };
//             }
//             return appointment;
//           });

//           // Update the local state with the entered text
//           setAppointments(updatedAppointments);
//           setOpen(false);
//         })
//         .catch((error) => {
//           // Handle error
//           console.log("Error accepting appointment:", error);
//         });

//       // Immediately update the confirmation status
//       const updatedAppointments = appointments.map((appointment) => {
//         if (appointment.id === acceptedAppointments.id) {
//           return {
//             ...appointment,
//             confirmed: true,
//             meetingURL: meetifyURL,
//           };
//         }
//         return appointment;
//       });

//       setAppointments(updatedAppointments);
//       setOpen(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDecline = (appointmentId) => {
//     // Update the appointments state by removing the declined appointment
//     const updatedAppointments = appointments.filter(
//       (appointment) => appointment.id !== appointmentId
//     );
//     setAppointments(updatedAppointments);

//     // Send a request to delete the appointment
//     fetch(
//       `http://appointment.us-west-2.elasticbeanstalk.com/appointments/delete/${appointmentId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: appointmentId }),
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle success response
//         console.log(`Appointment with ID ${appointmentId} has been declined.`);
//       })
//       .catch((error) => {
//         // Handle error
//         console.log(
//           `Error declining appointment with ID ${appointmentId}:`,
//           error
//         );
//       });
//   };

//   const handleDone = (appointmentId) => {
//     // Handle done logic here
//     console.log(`Appointment with ID: ${appointmentId} is done`);
//   };

//   const handleJoin = (appointmentId) => {
//     const appointment = appointments.find(
//       (appointment) => appointment.id === appointmentId
//     );
//     console.log("appointment", appointment);
//     if (appointment) {
//       const meetingUrl = appointment.meetingURL;

//       if (meetingUrl) {
//         window.open(meetingUrl, "_blank", "width=800,height=600"); // Redirect to the meeting URL
//       } else {
//         console.log("No meeting URL found for the selected appointment.");
//       }
//     }
//   };

//   const filteredAppointments = appointments.filter((appointment) => {
//     const matchingAvailability = availabilityData.find(
//       (item) => item.id === appointment.availabilityId
//     );
//     return matchingAvailability !== undefined;
//   });

//   const sortedAppointments = filteredAppointments.sort((a, b) => {
//     const dateA = getAvailabilityDate(a.availabilityId);
//     const dateB = getAvailabilityDate(b.availabilityId);
//     return new Date(dateB) - new Date(dateA);
//   });

//   const formatDateTime = (date) => {
//     const dateTime = new Date(date);
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//       // timeZone: "UTC",
//     };
//     return dateTime.toLocaleString("en-US", options);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAcceptedAppointments(null);
//   };

//   const handleOpen = (appointment) => {
//     setOpen(true);

//     setAcceptedAppointments(appointment);
//     console.log(appointment);
//   };

//   const isURLValid =
//   /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
//       meetifyURL
//     );

//   return (
//     <>
//       <Box sx={{ overflowX: "auto" }}>
//         <TableContainer
//           component={Paper}
//           sx={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}
//         >
//           <Box sx={{ minWidth: 650, overflowX: "auto" }}>
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#a0d4d4",
//                       color: "#000000",
//                       fontWeight: "600",
//                       borderBottom: "0px solid #ffffff",
//                       textAlign: "center",
//                       width: "10%",
//                     }}
//                   >
//                     Availability ID
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#a0d4d4",
//                       color: "#000000",
//                       fontWeight: "600",
//                       borderBottom: "0px solid #ffffff",
//                       textAlign: "center",
//                       width: "20%",
//                     }}
//                   >
//                     Availability Date
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#a0d4d4",
//                       color: "#000000",
//                       fontWeight: "600",
//                       borderBottom: "0px solid #ffffff",
//                       textAlign: "center",
//                       width: "20%",
//                     }}
//                   >
//                     Pending Status
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#a0d4d4",
//                       color: "#000000",
//                       fontWeight: "600",
//                       borderBottom: "0px solid #ffffff",
//                       textAlign: "center",
//                       width: "20%",
//                     }}
//                   >
//                     Confirmation
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "#a0d4d4",
//                       color: "#000000",
//                       fontWeight: "600",
//                       borderBottom: "0px solid #ffffff",
//                       textAlign: "center",
//                       width: "20%",
//                     }}
//                   >
//                     Session
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {sortedAppointments.map((appointment) => (
//                   <TableRow
//                     key={appointment.id}
//                     sx={{
//                       "&:last-child td": { borderBottom: 0 },
//                       "&:hover": { backgroundColor: "#daf2f2" },
//                       "&:hover td": { backgroundColor: "inherit" },
//                     }}
//                   >
//                     <TableCell
//                       sx={{
//                         borderBottom: "1px solid #f5f5f5",
//                         borderRight: "1px solid #000000",
//                         textAlign: "center",
//                       }}
//                     >
//                       {appointment.availabilityId}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderBottom: "1px solid #f5f5f5",
//                         borderRight: "1px solid #000000",
//                       }}
//                     >
//                       {formatDateTime(
//                         getAvailabilityDate(appointment.availabilityId)
//                       )}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderBottom: "1px solid #f5f5f5",
//                         borderRight: "1px solid #000000",
//                         textAlign: "center",
//                       }}
//                     >
//                       {getPendingStatus(
//                         getAvailabilityDate(appointment.availabilityId)
//                       )}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderBottom: "1px solid #f5f5f5",
//                         borderRight: "1px solid #000000",
//                       }}
//                     >
//                       {getPendingStatus(
//                         getAvailabilityDate(appointment.availabilityId)
//                       ) === "Future" ||
//                       getPendingStatus(
//                         getAvailabilityDate(appointment.availabilityId)
//                       ) === "Today" ? (
//                         <>
//                           {appointment.confirmed ? (
//                             <Button
//                               style={{
//                                 backgroundColor: "#a0d4d4",
//                                 color: "black",
//                                 borderRadius: "9px",
//                                 padding: "4px 8px",
//                                 textTransform: "none",
//                                 width:"100%",
//                                 fontWeight:'bold',
//                                 fontSize: '1rem',
//                                 fontStyle: 'italic',
//                                 letterSpacing: 2 ,
//                               }}
//                             >
//                               Pending...
//                             </Button>
//                           ) : (
//                             <>
//                               <Button
//                                 onClick={() => handleOpen(appointment)}
//                                 variant="outlined"
//                                 color="success"
//                                 sx={{ margin:"0% 0% 3% 0%", width: "100%",}}
                              
//                               >
//                                 Accept
//                               </Button>
//                               <Button
//                                 onClick={() => handleDecline(appointment.id)}
//                                 variant="outlined"
//                                 color="error"
//                                 sx={{ marginLeft:"0%", 
//                                 width:"100%",
//                               }}
//                               >
//                                 Decline
//                               </Button>
//                             </>
//                           )}
//                         </>
//                       ) : (
//                         <Button
//                           onClick={() => handleDone(appointment.id)}
//                           variant="outlined"
//                           color="success"
//                           sx={{ marginLeft: "70px" }}
//                         >
//                           Done
//                         </Button>
//                       )}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         borderBottom: "1px solid #f5f5f5",
//                         display: "flex",
//                         alignItems: "center",
//                       }}
//                     >
//                       {getPendingStatus(
//                         getAvailabilityDate(appointment.availabilityId)
//                       ) === "Future" ||
//                       getPendingStatus(
//                         getAvailabilityDate(appointment.availabilityId)
//                       ) === "Today" ? (
//                         <Button
//                           disabled={!appointment.confirmed}
//                           onClick={() => handleJoin(appointment.id)}
//                           variant="outlined"
//                           color="primary"
//                           sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             marginLeft: "8px",
//                             width: "100%",
//                             "@media screen and (max-width: 600px)": {
//                               marginLeft: 0,
//                               marginTop: "8px",
//                             },
//                           }}
//                         >
//                           Join
//                         </Button>
//                       ) : null}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </TableContainer>
//       </Box>

//       {/* modal for confirm appointment */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Enter your meerting Url
//           </Typography>
//           <Input
//             sx={{
//               mt: 1,
//               border: "1px solid black",
//               borderRadius: "10px",
//               padding: "0px 5px",
//             }}
//             onChange={(e) => setMeetifyURL(e.target.value)}
//             placeholder="Link here"
//           />

//           <Button
//             sx={{
//               mt: 2,
//               backgroundColor: "#a0d4g8",
//               color: "black",
//               borderRadius: "3px",
//               cursor: "pointer",
//               margin: "0px 0px 0px 10px",
//               outline: "solid 1px",
//               "&:hover": {
//                 backgroundColor: "#4ab3b3",
//               },
//               "&:disabled": {
//                 backgroundColor: "#a0d4g8",
//                 cursor: "not-allowed",
//                 outline: "none",
//                 color: "white",
//               },
//             }}
//             onClick={handleAccept}
//             disabled={!isURLValid}
//           >
//             Confirm
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default AvailabilityTable;