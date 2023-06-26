import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import bg from "../images/bg.jpeg";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [expired, setExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 3 minutes in seconds
  const emailAndToken = window.location.href.split('email=')[1];
  const [email, token] = emailAndToken.split("&token=");
  console.log('email:', email);
  console.log('token:', token);

  const history = useNavigate();

  useEffect(() => {
    const timestamp = localStorage.getItem('timestamp');
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - timestamp;

    if (elapsedTime < remainingTime) {
      setRemainingTime(remainingTime - elapsedTime);
    } else {
      setExpired(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timestamp', Math.floor(Date.now() / 1000));

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      setExpired(true);
    }
  }, [remainingTime]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (expired) {
      console.log("Link expired. Please resend the link.");
      return;
    }

    const newUser = {
      id: 1,
      email: email,
      token: token,
      password: password
    };

    console.log(newUser);

    try {
      const accountUrl = process.env.REACT_APP_API_KEY
      const response = await fetch(`${accountUrl}/user/forgotpassword/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        console.log("User password is updated!");
        console.log(newUser);
        history('/login'); // Navigate to the login page
      } else {
        console.log("Some error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bg.jpeg'})`,
          backgroundPosition: "center",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "450px",
            marginRight: "8rem",
            width: "100%",
            height: "100%",
            maxHeight: "50rem",
            padding: "1rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleForm}
        >
          <h2
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "2.8rem",
              marginTop: "1rem",
              fontWeight: "bolder",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
          >
            PEACE OF MIND
          </h2>
          <p
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            It's okay not to be okay
          </p>
          <h1
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.8rem",
              fontWeight: "bolder",
              textAlign: "center",
              marginTop: "3rem",
            }}
          >
            Reset Password
          </h1>

          <FormControl>
            <TextField
              type='password'
              label="Enter Your New Password"
              required
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginTop: "2rem",
              }}
            />
          </FormControl>

          {expired ? (
            <Typography variant="body2" color="error">
              Your link has expired. Kindly resend the link.
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Time remaining: {formatTime(remainingTime)}
            </Typography>
          )}

          <Button
            type="submit"
            value="send"
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Reset Password
          </Button>
        </Box>
      </div>
    </>
  );
}

export default NewPassword;
