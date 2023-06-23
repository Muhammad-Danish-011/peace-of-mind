import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
// import bg from '${process.env.PUBLIC_URL + /images/bg.jpr}';
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormControl,
} from "@mui/material";


const Loginform = () => {

  if(sessionStorage.getItem("islogin")){
    if(sessionStorage.getItem("role") == "PATIENT"){
      window.location.assign("/user-profile");
    }
    else if(sessionStorage.getItem("role") == "COUNSELOR"){
      window.location.assign("/home");
    }
    else{
      
    } 

  }
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setLoginStatus,setitems } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { updateLoginUserId } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    try {
      const accountUrl = process.env.REACT_APP_API_KEY
      const response = await fetch(`${accountUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("user", JSON.stringify(user.user));
        console.log(user.role);
        setLoginStatus(true);
        updateLoginUserId(user.user.id)

        if (user.role === "PATIENT") {
          navigate("/user-profile");
        } else if (user.role === "COUNSELOR") {
          navigate("/user-profile");
        }
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
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
            '@media (max-width: 380px)': {
              marginRight: "0rem",
              margin: "1%",
              justifyContent: "center",
            }
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
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}
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
            Don't have an account? <Link to="/signup">SignUp</Link>
          </p>
        </Box>
      </div>
    </>
  );
};

export default Loginform;