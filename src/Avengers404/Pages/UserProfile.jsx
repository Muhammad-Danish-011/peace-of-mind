import React,{useState} from "react";
import Sidebar from "../global/Sidebar";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import doctor from "../images/doctor.png";
const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
const [firstName, setFirstName] = useState("Atia Khan");
const [lastName, setLastName] = useState("");
const [password, setPassword] = useState("");
const [address, setAddress] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [cnic, setCnic] = useState("");
const [specialization, setSpecilization] = useState("");
const [description, setDescription] = useState("");
const [guardian_phone_number, setGuardian_phone_number] = useState("");
const handleEdit = () => {
  setEditMode(true);
};
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
          margin: "0rem 1rem 1rem 7.1rem",
        }}>
        <Box
          sx={{
            margin: "2rem",
          }}>
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
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid green",
            }}
            src={doctor}
            alt=""
          />
          <Box
            sx={{
              marginLeft: "2rem",
            }}>
            <h2>Name:</h2>
            <p>Category</p>
          </Box>
        </Box>
        <Box
          sx={{
            border: "1px solid green",
            borderRadius: "7px",
            padding: "2rem",
            margin: "2rem 2rem  ",
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
            }}>
            <h2>Personal Information:</h2>
            {!editMode && (
              <Button
                variant="contained"
                type="submit"
                onClick={handleEdit}
                sx={{
                  width: "10%",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                Edit
                <IconButton sx={{ color: "white" }}>
                  <EditIcon />
                </IconButton>
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            <p>First Name:</p>
            <p>Last Name:</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "1rem",
            }}>
            {/* <h4>First Name:</h4>
            <h4>Last Name:</h4> */}
{!editMode ? (
              <>
                <p>{firstName}</p>
                <p>{lastName}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}>
            <p>Email Address:</p>
            <p>Password:</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "1rem",
            }}>
            {!editMode ? (
              <>
                <p>{email}</p>
                <p>{password}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}>
            <p>Phone Number:</p>
            <p>Address</p>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "1rem",
            }}>
              {!editMode ? (
              <>
                <p>{phone}</p>
                <p>{address}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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