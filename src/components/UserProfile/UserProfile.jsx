import React, { useState, useEffect, useContext } from "react";

import { Box, Button, IconButton, InputBase, Table } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import './UserProfile.css';

import { AuthContext } from "../Authcontext/AuthContext";
const UserProfile = () => {
  const [userEditMode, setUserEditMode] = useState(false);
  const [patientEditMode, setPatientEditMode] = useState(false);
  const [counselorEditMode, setCounselorEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");
  const [gender, setGender] = useState("");


  const obj = JSON.parse(sessionStorage.getItem("user"));

  // console.log(obj);
  const accountUrl = process.env.REACT_APP_API_KEY;
  const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY
  const patientUrl = process.env.REACT_APP_PATIENT_API_KEY
  const userHandleEdit = () => {
    setUserEditMode(true);
  };

  const counselorHandleEdit = () => {
    setCounselorEditMode(true);
  };

  const patientHandleEdit = () => {
    setPatientEditMode(true);
  };

  const userHandleSave = () => {
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
    };

    fetch(
      `http://accountservice.us-east-1.elasticbeanstalk.com/user/update/${obj?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setUserEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const counselorHandleSave = () => {
    const counselordata = JSON.parse(sessionStorage.getItem("counselor_data"));

    const counselorUpdatedData = {
      id: counselordata.id,
      userId: userData.id,
      specialization: specialization,
      description: description,
    };
    console.log(counselorUpdatedData);
    fetch(
      `${councelorUrl}/counselor/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counselorUpdatedData),

      }
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCounselorEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const patientHandleSave = () => {


    const userdata = JSON.parse(sessionStorage.getItem("user_data"));
    const patientUpdatedData = {
      id: userdata.id,
      userId: userData.id,
      guardianPhoneNumber: guardianPhoneNumber,
    };
    console.log(patientUpdatedData);
    fetch(`${patientUrl}/patient/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(patientUpdatedData),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setPatientEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch(
      `${accountUrl}/user/get/${obj?.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPassword(data.password);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setRole(data.role);
        setCnic(data.cnic);
        setGender(data.gender);

        if (data.role === "COUNSELOR") {
          fetch(
            `${councelorUrl}/counselor/get/${obj?.id}`
          )
            .then((response) => response.json())
            .then((counselorData) => {
              console.log('-------======--', counselorData);
              setSpecialization(counselorData.specialization);
              setDescription(counselorData.description);
              sessionStorage.setItem("counselor_data", JSON.stringify(counselorData))
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (data.role === "PATIENT") {
          fetch(
            `${patientUrl}/patient/getByUserId/${obj.id}`
          )
            .then((response) => response.json())
            .then((patientData) => {
              setGuardianPhoneNumber(patientData.data.guardianPhoneNumber);
              sessionStorage.setItem("user_data", JSON.stringify(patientData.data))
              console.log({patientData})
            })

            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{

          fontFamily: "Quicksand, sans-serif",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

        }}
      >

        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>


          <h1>My Profile</h1>


          <Box
            sx={{

              padding: "1rem",
              margin: "0rem 2rem ",
              fontFamily: "Quicksand, sans-serif",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              
              src={role === "COUNSELOR" ?
              gender === "MALE" ? `${process.env.PUBLIC_URL + '/images/doctoricon.png'}`: `${process.env.PUBLIC_URL + '/images/doctor.png'}`
             :
              gender === "MALE" ? `${process.env.PUBLIC_URL + '/images/patient.png'}` : `${process.env.PUBLIC_URL + '/images/patienticon.png'}` }
              alt="role"
              style={{

                alignSelf: "center",
                width: "150px",
                height: "150px",
                marginTop: "1rem"
              }}
            />
            <Box sx={{}}>
              <h1
                sx={{
                  fontSize: "8rem",
                  fontWeight: "bolder",
                }}
              >
                {firstName} {lastName}
              </h1>
              <h3
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",

                }}
              >
                {role}
              </h3>

              {role === "COUNSELOR" && (
                <Box sx={{
                  display: "flex",
                  flexDirection: "row",

                  justifyContent: "center",
                  '@media (max-width: 540px)': {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    alignContent: "space-around",

                  }


                }}>
                  <Button variant="contained" component={Link} to="/availibilitytable" color="success" sx={{
                    padding: "10px",
                    marginRight: "3%",
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "1rem",
                    '@media (max-width: 540px)': {
                      margin: "2%",
                    }
                  }}>
                    View Availability
                  </Button>


                  <Button variant="contained" color="success" component={Link} to="/Calendar" sx={{
                    padding: "10px",
                    marginRight: "3%",
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "1rem",
                    '@media (max-width: 540px)': {
                      margin: "2%",
                    }
                  }}>
                    View Calender
                  </Button>

                  <Button variant="contained" color="success" component={Link} to="/counselor" sx={{
                    padding: "10px",
                    marginRight: "3%",
                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "1rem",
                    '@media (max-width: 540px)': {
                      margin: "2%",
                    }
                  }}>
                    View Dashboard
                  </Button>

                </Box>
              )}

              {role === "PATIENT" && (

                <Box sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row",
                }}>
                  <Button variant="contained" color="success" component={Link} to="/appointments" sx={{

                    fontFamily: "Quicksand, sans-serif",
                    fontSize: "1.5rem",
                    '@media (max-width: 540px)': {
                      margin: "2%",
                    }
                  }}>
                    View Appointments
                  </Button>
                </Box>
              )}
            </Box>
          </Box>


        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          '@media (max-width: 1024px)': {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }
        }}>
          <Box
            sx={{


              width: "35%",
              display: "flex",
              fontFamily: "Quicksand, sans-serif",

              justifyContent: "space-around",
              '@media (max-width: 1024px)': {
                display: "flex",
                flexDirection: "column",
                width: "80%",
                alignItems: "center",
                alignContent: "space-around"
              }

            }}
          >


            <Box>
              <Box
                sx={{


                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "normal",

                }}
              >

                <h2
                  sx={{
                    fontSize: "3rem",
                    fontWeight: "bolder",
                  }}
                >
                  <ImportContactsIcon style={{
                    fontSize: "60px",
                    paddingRight: "30px",
                    color: "green",

                  }} />
                  Personal Information
                </h2>
                <Table cellpadding="3" style={{ width: '100%' }}>
                  <tr>
                    <td><p sx={{ fontWeight: "bold" }} styles={{}}>
                      First Name:
                    </p></td>

                    <td>
                      {!userEditMode ? (
                        <>
                          <p>{firstName}</p>

                        </>
                      ) : (
                        <>
                          <InputBase className="inputBasedBox"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}

                          />

                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold" }}>Last Name:</p>
                    </td>

                    <td>
                      {!userEditMode ? (
                        <>

                          <p>{lastName}</p>
                        </>
                      ) : (
                        <>

                          <InputBase className="inputBasedBox "

                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            data-testid='lastname'
                            sx={{
                              fontWeight: "bold",
                              fontSize: "1.2rem",

                            }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold", fontSize: "12rem" }}>
                        Email Address:
                      </p>
                    </td>

                    <td>
                      {!userEditMode ? (
                        <>
                          <p>{email}</p>

                        </>
                      ) : (
                        <>
                          <InputBase className="inputBasedBox"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                          />

                        </>
                      )}
                    </td>
                  </tr>


                  {/* <tr>
                    <td>
                      <p sx={{ fontWeight: "bold" }}>Password:</p>
                    </td>

                    <td>
                      {!userEditMode ? (
                        <>

                          <p>{password.replace(/./g, "*").substring(0, Math.min(password.length, 8))}</p>
                        </>
                      ) : (
                        <>

                          <InputBase className="inputBasedBox"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)
                            }

                          />
                        </>
                      )}
                    </td>
                  </tr> */}


                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        Phone Number:
                      </p>
                    </td>

                    <td>
                      {!userEditMode ? (
                        <>
                          <p>{phoneNumber}</p>

                        </>
                      ) : (
                        <>
                          <InputBase className="inputBasedBox"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}

                          />

                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold", fontSize: "5rem" }}>Address:</p>
                    </td>

                    <td>
                      {!userEditMode ? (
                        <>

                          <p>{address}</p>
                        </>
                      ) : (
                        <>

                          <InputBase className="inputBasedBox"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}

                          />
                        </>
                      )}
                    </td>
                  </tr>


                </Table>





              </Box>




              {!userEditMode ? (
                <Button
                  variant="contained"
                  onClick={userHandleEdit}
                  startIcon={<EditIcon />}
                  sx={{
                    width: "30%",
                    height: "10%",


                    border: '1px solid green',
                    backgroundColor: 'rgb(207,227,223)',
                    color: "black",

                    '@media (max-width: 1024px)': {
                      margin: "10%"
                    },
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={userHandleSave}
                  startIcon={<SaveIcon />}

                  sx={{
                    width: "25%",
                    height: "10%",
                    marginTop: "5%",
                    backgroundColor: "black",
                    color: "white",
                    '@media (max-width: 1024px)': {
                      margin: "10%"
                    },
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Save
                </Button>
              )}
            </Box>
          </Box>

          {/* academic information */}
          {role === "COUNSELOR" && (
            <Box
              sx={{

                display: "flex",
                width: "40%",

                marginLeft: "5%",
                fontFamily: "Quicksand, sans-serif",

                paddingLeft: "5%",
                flexDirection: "column",
                justifyContent: "space-around",

                '@media (max-width: 1024px)': {
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  marginTop: "5%",
                }

              }}
            >

              <Box
                sx={{

                  fontSize: "1.3rem",
                  fontWeight: "normal",
                }}
              >
                <h2
                  sx={{
                    fontSize: "3rem",
                    fontWeight: "bolder",
                  }}
                >
                  <SchoolIcon style={{
                    fontSize: "60px",
                    paddingRight: "30px",
                    color: "green",
                
                  }} />
                  Academic Information
                </h2>
                <Table cellpadding="3" style={{ width: '100%' }}>

                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold" }}>
                        Specialization:
                      </p>
                    </td>

                    <td>
                      {!counselorEditMode ? (
                        <>
                          <p>{specialization}</p>

                        </>
                      ) : (
                        <>
                          <InputBase className="inputBasedBox"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}

                          />

                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold" }}>
                        Description:
                      </p>
                    </td>

                    <td>
                      {!counselorEditMode ? (
                        <>

                          <p>{description}</p>
                        </>
                      ) : (
                        <>

                          <InputBase className="inputBasedBox"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                          />
                        </>
                      )}
                    </td>
                  </tr>
                </Table>


              </Box>
              <Box
                sx={{

                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginTop: "-5%",

                  '@media (max-width: 1024px)': {

                    marginTop: "0%",
                  }

                }}
              >

              </Box>
              {!counselorEditMode ? (
                <Button
                  variant="contained"
                  onClick={counselorHandleEdit}
                  startIcon={<EditIcon />}
                  sx={{
                    width: "15%",
                    height: "10%",

                    alignSelf: "center",
                    backgroundColor: "black",
                    color: "black",
                    border: '1px solid green',
                    backgroundColor: 'rgb(207,227,223)',
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={counselorHandleSave}
                  startIcon={<SaveIcon />}
                  sx={{
                    width: "15%",
                    height: "10%",
                    backgroundColor: "black",
                    alignSelf: "center",
                    color: "white",
                  
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Save
                </Button>
              )}
            </Box>

          )}

          {role === "PATIENT" && (
            <Box
              sx={{


                display: "flex",
                width: "30%",


                marginLeft: "5%",
                fontFamily: "Quicksand, sans-serif",

                flexDirection: "column",
                justifyContent: "space-evenly",

                '@media (max-width: 1024px)': {
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  marginTop: "5%",


                }
              }}
            >

              <Box
                sx={{

                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1.3rem",

                  fontWeight: "normal",

                }}
              >
                <h2>
                  <InterpreterModeIcon style={{
                    fontSize: "60px",
                    paddingRight: "30px",
                    color: "green",

                  }} />
                  Guardian Information:
                </h2>
                <Table cellpadding="3" style={{ width: '100%' }}>

                  <tr>
                    <td>
                      <p sx={{ fontWeight: "bold", }}>

                        Guardian Phone Number:
                      </p>
                    </td>

                    <td>
                      {!patientEditMode ? (
                        <p>{guardianPhoneNumber}</p>
                      ) : (
                        <InputBase className="inputBasedBox"
                          value={guardianPhoneNumber}
                          onChange={(e) => setGuardianPhoneNumber(e.target.value)}

                        />
                      )}
                    </td>
                  </tr>

                </Table>

              </Box>


              {!patientEditMode ? (
                <Button
                  variant="contained"
                  onClick={patientHandleEdit}
                  startIcon={<EditIcon />}
                  sx={{
                    width: "20%",
                    height: "10%",
                    backgroundColor: "black",
                    alignSelf: "center",
                    color: "black",
                    border: '1px solid green',
                    backgroundColor: 'rgb(207,227,223)',
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                    '@media (max-width: 1024px)': {
                      display: "flex",
                      flexDirection: "column",
                      width: "80%",
                      marginTop: "5%",
    
    
                    }
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={patientHandleSave}
                  startIcon={<SaveIcon />}
                  sx={{
                    width: "15%",
                    height: "10%",
                    alignSelf: "center",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Save
                </Button>
              )}
            </Box>

          )}

        </Box>

      </Box>
    </>
  );
};
export default UserProfile;



