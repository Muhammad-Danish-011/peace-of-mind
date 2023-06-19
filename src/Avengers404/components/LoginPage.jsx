import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import bg from "../images/bg.jpeg";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormControl,
} from "@mui/material";

const Loginform = () => {
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    console.log('Login successful');

    fetch('http://localhost:8082/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login Successfully');
          setLoginStatus(true); // Set login status to true
          setTimeout(() => {
            navigate('/dashboard'); // Navigate to dashboard
          }, 3000);  // Navigate to dashboard
        } else {
          console.log('Login Fail');
          setLoginStatus(false); // Set login status to false
        }
      })
      .catch((error) => {
        console.error('Error', error);
        setLoginStatus(false); // Set login status to false in case of an error
      });
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password should be at least 8 characters long';
    }
    return '';
  };

  return (
    <>
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${bg})`,
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
          autoComplete="on"
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
            Login Now
          </h1>

          <FormControl error={Boolean(errors.email)}>
            <TextField
              id="email"
              label="Email Address"
              required
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginTop: "2rem",
              }}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.email}
              </span>
            )}
          </FormControl>

          <FormControl error={Boolean(errors.password)}>
            <TextField
              id="password"
              label="Password"
              type="password"
              required
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginTop: "1rem",
              }}
            />
            {errors.password && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.password}
              </span>
            )}
          </FormControl>
          <a
              href="/forget-password"
              style={{
                marginLeft: "16rem",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
                textDecoration: "none",

              }}
            >
              Forgotten Password?
            </a>

          <Button
            type="submit"
            onClick={handleLogin}
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
            Login
          </Button>

          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "0",
              fontFamily: "Quicksand, sans-serif",
              fontSize: "0.9rem",
              fontWeight: "bolder",
              color: "black",
            }}
          >
            Don't have an account? <a href="/">SignUp</a>
          </p>
        </Box>
      </div>
    </>
  );
};

export default Loginform;













