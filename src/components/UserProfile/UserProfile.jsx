import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../global/Sidebar";
import { Box, Button, IconButton, InputBase } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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
  // const { loginUserId } = useContext(AuthContext);

  const obj = JSON.parse(sessionStorage.getItem("user"));

  console.log(obj);
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
          border: "2px solid green",
          borderRadius: "10px",
          fontFamily: "Quicksand, sans-serif",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "1rem 1rem 1rem 8rem",
        }}
      >
        <Box sx={{ margin: "0.5rem" }}>
          <h1>My Profile:</h1>
        </Box>

        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "1rem",
            margin: "0rem 2rem ",
            fontFamily: "Quicksand, sans-serif",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src={role === "COUNSELOR" ? `${process.env.PUBLIC_URL + '/images/doctor.png'}` : `${process.env.PUBLIC_URL + '/images/patient.png'}`}
            alt="role"
            style={{
              // width: "100px",
              // marginBottom: "0.5rem",
              borderRadius: "50%",
              border: "2px solid black",
              width: "150px",
              height: "150px",
              marginTop: "1rem"
            }}
          />
          <Box sx={{ margin: "1rem 2rem" }}>
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
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "1rem",
            margin: "2rem 2rem",
            display: "flex",
            fontFamily: "Quicksand, sans-serif",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // marginBottom: "1rem",
              padding: "1rem",
            }}
          >
            <h2
              sx={{
                fontSize: "3rem",
                fontWeight: "bolder",
              }}
            >
              Personal Information:
            </h2>

            {!userEditMode ? (
              <Button
                variant="contained"
                onClick={userHandleEdit}
                startIcon={<EditIcon />}
                sx={{
                  width: "6rem",
                  // backgroundColor: "black",
                  border: '1px solid green',
                  height:'3.5rem',
                  
                  backgroundColor: 'rgb(207,227,223)',
                  color: "black",
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
                  width: "10%",
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

          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
                // marginBottom: "1rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "normal",

              }}
            >
              <p sx={{ fontWeight: "bold" }} styles={{}}>
                First Name:
              </p>
              <p sx={{ fontWeight: "bold" }}>Last Name:</p>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {!userEditMode ? (
                <>
                  <p>{firstName}</p>
                  <p>{lastName}</p>
                </>
              ) : (
                <>
                  <InputBase className="inputBasedBox"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}

                  />
                  <InputBase className="inputBasedBox"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    data-testid='lastname'
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
                // marginTop: "2rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "normal",
                margin: "2rem 0rem 0rem 0rem",
              }}
            >
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
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {!userEditMode ? (
                <>
                  <p>{email}</p>
                  <p>{password.replace(/./g, "*").substring(0, Math.min(password.length, 8))}</p>
                </>
              ) : (
                <>
                  <InputBase className="inputBasedBox"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                  />
                  <InputBase className="inputBasedBox"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)
                    }

                  />
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                // marginTop: "2rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "normal",
                margin: "2rem 0rem 0rem 0rem",
              }}
            >
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
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {!userEditMode ? (
                <>
                  <p>{phoneNumber}</p>
                  <p>{address}</p>
                </>
              ) : (
                <>
                  <InputBase className="inputBasedBox"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}

                  />
                  <InputBase className="inputBasedBox"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}

                  />
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* academic information */}
        {role === "COUNSELOR" && (
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              <h2
                sx={{
                  fontSize: "3rem",
                  fontWeight: "bolder",
                }}
              >
                Academic Information:
              </h2>

              {!counselorEditMode ? (
                <Button
                  variant="contained"
                  onClick={counselorHandleEdit}
                  startIcon={<EditIcon />}
                  sx={{
                    width: "10%",
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
                    width: "10%",
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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p sx={{ fontWeight: "bold", fontSize: "3rem" }}>
                Specialization:
              </p>
              <p sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Description:
              </p>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.4rem",
                fontWeight: "bold",
                margin: "8px",
              }}
            >
              {!counselorEditMode ? (
                <>
                  <p>{specialization}</p>
                  <p>{description}</p>
                </>
              ) : (
                <>
                  <InputBase className="inputBasedBox"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}

                  />
                  <InputBase className="inputBasedBox"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                  />
                </>
              )}
            </Box>
          </Box>
        )}

        {role === "PATIENT" && (
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              <h2
                sx={{
                  fontSize: "3rem",
                  fontWeight: "bolder",
                }}
              >
                Guardian Information:
              </h2>

              {!patientEditMode ? (
                <Button
                  variant="contained"
                  onClick={patientHandleEdit}
                  startIcon={<EditIcon />}
                  sx={{
                    width: "10%",
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
                  onClick={patientHandleSave}
                  startIcon={<SaveIcon />}
                  sx={{
                    width: "10%",
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
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
                marginBottom: "1rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                // alignItems:"center",
                fontWeight: "normal",
                margin: "3px",
              }}
            >
              <p sx={{ fontWeight: "bold", fontSize: "2rem" }}>
                Guardian Phone Number:
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent:"center",
                gap: "2rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {!patientEditMode ? (
                <p>{guardianPhoneNumber}</p>
              ) : (
                <InputBase className="inputBasedBox"
                  value={guardianPhoneNumber}
                  onChange={(e) => setGuardianPhoneNumber(e.target.value)}

                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default UserProfile;
