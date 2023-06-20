import React, { useState, useEffect } from "react";
import Sidebar from "../global/Sidebar";
import { Box, Button, IconButton, InputBase } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import patient from "../images/patient.png";
import doctor from "../images/doctor.png";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [password, setPassword] = useState(userData.password);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    const updatedData = {
      ...userData,
      firstName,
      lastName,
      password,
      address,
      email,
      phoneNumber,
      role,
      cnic,
      specialization,
      description,
      guardianPhoneNumber,
    };

    fetch("http://localhost:8082/user/update/102", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8082/user/get/102")
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setAddress(result.address);
        setCnic(result.cnic);
        setPhoneNumber(result.phoneNumber);
        setPassword(result.password);
        setEmail(result.email);
        setRole(result.role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Sidebar />

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
        }}>
        <Box sx={{ margin: "2rem" }}>
          <h1>My Profile:</h1>
        </Box>

        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "3rem",
            margin: "0rem 2rem ",
            fontFamily: "Quicksand, sans-serif",
            display: "flex",
            flexDirection: "row",
          }}>
          {/* <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid green",
            }}
            src={doctor}
            alt=""
          /> */}
          <img
            src={role === "COUNSELOR" ? doctor : patient}
            alt="role"
            style={{ width: "100px", marginBottom: "0.5rem" }}
          />
          <Box sx={{ margin: "1rem 2rem" }}>
            <h1
              sx={{
                fontSize: "8rem",
                fontWeight: "bolder",
              }}>
              {firstName} {lastName}
            </h1>
            <h3
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                marginTop: "50px",
              }}>
              {role}
            </h3>
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "2rem",
            margin: "2rem 2rem",
            display: "flex",
            fontFamily: "Quicksand, sans-serif",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "1rem",
              padding: "1rem",
            }}>
            <h2
              sx={{
                fontSize: "3rem",
                fontWeight: "bolder",
              }}>
              Personal Information:
            </h2>

            {!editMode ? (
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                sx={{
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}>
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}>
                Save
              </Button>
            )}
          </Box>

         <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
                marginBottom: "1rem",
              }}>
              <p sx={{ fontWeight: "bold", fontSize: "2rem" }}>First Name:</p>
              <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Last Name:</p>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
              }}>
              {!editMode ? (
                <>
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                </>
              ) : (
                <>
                  <InputBase
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                  <InputBase
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                marginTop: "2rem",
              }}>
              <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Email Address:
              </p>
              <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Password:</p>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
              }}>
              {!editMode ? (
                <>
                  <p>{email}</p>
                  <p>{password}</p>
                </>
              ) : (
                <>
                  <InputBase
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                  <InputBase
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                marginTop: "2rem",
              }}>
              <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Phone Number:
              </p>
              <p sx={{ fontWeight: "bold", fontSize: "5rem" }}>Address:</p>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
              }}>
              {!editMode ? (
                <>
                  <p>{phoneNumber}</p>
                  <p>{address}</p>
                </>
              ) : (
                <>
                  <InputBase
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                  <InputBase
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                  />
                </>
              )}
            </Box>
         </Box>
        </Box>

        {/* academic information */}
        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "2rem",
            margin: "2rem 2rem",
            display: "flex",
            fontFamily: "Quicksand, sans-serif",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "1rem",
              padding: "1rem",
            }}>
            <h2
              sx={{
                fontSize: "3rem",
                fontWeight: "bolder",
              }}>
              Academic Information:
            </h2>

            {!editMode ? (
              <Button
                variant="contained"
                onClick={handleEdit}
                startIcon={<EditIcon />}
                sx={{
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}>
                Edit
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}>
                Save
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
              marginBottom: "1rem",
            }}>
            <p sx={{ fontWeight: "bold", fontSize: "2rem" }}>Specialization:</p>
            <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>Description:</p>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "2rem",
            }}>
            {!editMode ? (
              <>
                <p>{specialization}</p>
                <p>{description}</p>
              </>
            ) : (
              <>
                <InputBase
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textDecoration: "underline",
                  }}
                />
                <InputBase
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textDecoration: "underline",
                  }}
                />
              </>
            )}
          </Box>
        </Box>
    </Box>

  </>
  
  );
};

 export default UserProfile;

// import React, { useState, useEffect } from "react";

// import Sidebar from "../global/Sidebar";

// import { Box, Button, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

// import doctor from "../images/doctor.png";
// const UserProfile = () => { */}
{/* //   const [editMode, setEditMode] = useState(false);
//   const [userData, setUserData] = useState({});

//   const [firstName, setFirstName] = useState(userData.firstName);
//   const [lastName, setLastName] = useState(userData.lastName);
//   const [password, setPassword] = useState(userData.password);
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [cnic, setCnic] = useState("");
//   const [role, setRole] = useState("");
//   const [specialization, setSpecilization] = useState("");
//   const [description, setDescription] = useState("");
//   const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");

//   const handleEdit = () => { */}
{/* //     setEditMode(true);
//   };

//   const handleSave = () => { */}
{/* //     const updatedData = { */}
{/* //       ...userData,
//       firstName,
//       lastName,
//       password,
//       address,
//       email,
//       phoneNumber,
//       role,
//       cnic,
//       specialization,
//       description,
//       guardianPhoneNumber,
//     };

//     fetch("http://localhost:8082/user/update/102", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     }) */}
{/* //       .then((response) => response.text())
//       .then((result) => {
//         console.log(result);
//         setEditMode(false);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }; */}

// {/* //   useEffect(() => {
//     fetch("http://localhost:8082/user/get/102")
//       .then((response) => response.json())
//       .then((result) => {
//         setUserData(result);
//         setFirstName(result.firstName);
//         setLastName(result.lastName);
//         setAddress(result.address);
//         setCnic(result.cnic);
//         setPhoneNumber(result.phoneNumber);
//         setPassword(result.password);
//         setEmail(result.email);
//         setRole(result.role);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   console.log(userData);
//   // http://councelorapp-env.eba-mdmsh3sq.us-east-1.elasticbeanstalk.com/counselor/get
//   //http://localhost:8082/user/get/102
//   return (
//     <>
//       <Sidebar />

//       <Box
//         sx={{
//           border: "2px solid green",
//           borderRadius: "10px",
//           fontFamily: "Quicksand, sans-serif",

//           backgroundColor: "white",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           margin: "2rem 1rem 1rem 7.1rem",
//         }}>
//         <Box
//           sx={{
//             margin: "2rem",
//           }}>
//           <h1>My Profile:</h1>
//         </Box>

//         <Box
//           sx={{
//             border: "1px solid green",
//             borderRadius: "7px",
//             padding: "3rem",
//             margin: "0rem 2rem ",
//             fontFamily: "Quicksand, sans-serif",

//             display: "flex",
//             flexDirection: "row",
//           }}>
//           <img
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               border: "2px solid green",
//             }}
//             src={doctor}
//             alt=""
//           />
//           <Box
//             sx={{
//               marginLeft: "2rem",
//             }}>
//             <h2
//               sx={{
//                 fontSize: "5rem",
//               }}>
//               {firstName} {lastName}
//             </h2>
//             <p>{role}</p>
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             border: "1px solid green",
//             borderRadius: "7px",
//             padding: "2rem",
//             margin: "2rem 2rem  ",
//             display: "flex",
//             fontFamily: "Quicksand, sans-serif",

//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}>
//             <h2>Personal Information:</h2>

//             {!editMode ? (
//               <Button
//                 variant="contained"
//                 onClick={handleEdit}
//                 startIcon={<EditIcon />}
//                 sx={{
//                   width: "10%",
//                   backgroundColor: "black",
//                   color: "white",
//                   "&:hover": {
//                     backgroundColor: "#333",
//                   },
//                 }}>
//                 Edit
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={handleSave}
//                 startIcon={<SaveIcon />}
//                 sx={{
//                   width: "10%",
//                   backgroundColor: "black",
//                   color: "white",
//                   "&:hover": {
//                     backgroundColor: "#333",
//                   },
//                 }}>
//                 Save
//               </Button>
//             )}
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//             }}>
//             <p>First Name:</p>
//             <p>Last Name:</p>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               marginTop: "1rem",
//             }}>
//             {!editMode ? (
//               <>
//                 <p>{firstName}</p>
//                 <p>{lastName}</p>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </>
//             )}
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               marginTop: "2rem",
//             }}>
//             <p>Email Address:</p>
//             <p>Password:</p>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               marginTop: "1rem",
//             }}>
//             {!editMode ? (
//               <>
//                 <p>{email}</p>
//                 <p>{password}</p>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </>
//             )}
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               marginTop: "2rem",
//             }}>
//             <p>Phone Number:</p>
//             <p>Address</p>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               marginTop: "1rem",
//             }}>
//             {!editMode ? (
//               <>
//                 <p>{phoneNumber}</p>
//                 <p>{address}</p>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                 />
//                 <input
//                   type="text"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UserProfile; */}
