
// import bg from "../images/bg.jpeg";
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import {
  Box,
  TextField,
  Button,
  FormControl,
} from "@mui/material";

const ForgetPassword = () => {
  const form = useRef();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const resetform=()=>{
    setEmail("");
  }

  const sendEmail = (e) => {
    e.preventDefault();
    const userEmail = email;
  
    fetch(`http://accountservice.us-east-1.elasticbeanstalk.com/user/ForgotPassword/${userEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          throw new Error(data.error);
        } else {
          const token = generateRandomToken();
          const emailLink = `http://localhost:3000/new-password/?email=${userEmail}&token=${token}`;
          const messageInput = document.createElement('input');
          messageInput.type = 'hidden';
          messageInput.name = 'message';
          messageInput.value = emailLink;
          form.current.appendChild(messageInput);
  
          const tokenInput = document.createElement('input');
          tokenInput.type = 'hidden';
          tokenInput.name = 'token';
          tokenInput.value = token;
          form.current.appendChild(tokenInput);
  
          emailjs
            .sendForm('service_zgcb8cy', 'template_dx8gftp', form.current, '04RwhtqN7IMklYKNm')
            .then((result) => {
              fetch(`http://accountservice.us-east-1.elasticbeanstalk.com/user/ForgotPassword/token`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, token: token }),
              });
              const expirationTime = 3 * 60 * 1000; // 3 minutes in milliseconds
                setTimeout(() => {
                  console.log('Token link has expired!');
                }, expirationTime);
              console.log('Reset link is successfully sent to the user!');
              console.log('Email Link:', emailLink);
              console.log('Link will expire in three minutes')
              setEmailSent(true);
              resetform();
            })
            .catch((error) => {
              console.log('An error occurred while sending the email:', error);
            });
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log('Error:', error.message);
      });
  };

  const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 8; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  return (
    <div 
      className="Forgot-container"
      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bg.jpeg'})`,
      //   backgroundPosition: "center",
      //   height: '100vh',
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}

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
        // sx={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   '& .MuiTextField-root': {
        //     m: 1,
        //     marginTop: '35px',
        //     width: '19rem',
        //     marginRight: '3.0rem',
        //     backgroundColor: 'white',
        //     color: 'black',
        //     borderRadius: '10px',
        //     borderColor: 'white',
        //   },
        // }}

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
        onSubmit={sendEmail}
        ref={form}
      >
        {/* <div>
          <h1
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "2.5rem",
              fontWeight: "bolder",
              marginTop: "8rem",
              textAlign: "center",
              marginLeft: "25rem",
            }}
          >
            Forgot Password
          </h1>
          <div
            style={{
              textAlign: "left",
              marginLeft: "15rem",
              marginTop: "10rem",
              display: "block",
            }}
          >
            <h2
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "3.2rem",
                fontWeight: "bolder",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                marginRight: "10rem",
              }}
            >
              PEACE OF MIND
            </h2>
            <p
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1rem",
                fontWeight: "bolder",
                marginLeft: "7rem",
                marginTop: "-2.5rem",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                textAlign: "left",
              }}
            >
              It's okay not to be okay
            </p>
          </div>
        </div> */}

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
            Forgot Password
          </h1>

        {/* <div
          className="thirdrow"
          style={{ display: "flex", marginLeft: "50rem", marginTop: "-10rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label
              style={{
                marginRight: "2.5rem",
                fontSize: "1.4rem",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bolder",
              }}
            >
              Enter Your Registered Email
            </label>
            <TextField
              id="outlined-multiline-flexible"
              label="Enter your Email"
              name="user_email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div> */}

<FormControl >
            <TextField
              id="email"
              label="Enter Your Registered Email"
              required
              name='user_email'
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginTop: "2rem",
              }}
            />
            {/* {errors.email && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                {errors.email}
              </span>
            )} */}
          </FormControl>

        {/* <div
          style={{ marginBottom: '1rem', borderRadius: '10px', marginLeft: '27rem', marginTop: '40px', textAlign: 'center' }}
        >
          <button
            type="submit"
            value="send"
            style={{
              borderRadius: '10px',
              marginTop:'2rem',
              padding: '15px',
              color: 'black',
              backgroundColor: "white",
              fontSize: '20px',
            }}
          >
            Verification Code
          </button>
        </div> */}

<Button
            type="submit"
            value = "send"
            
            // variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Send  Verification Code
          </Button>
          {!emailSent && error && (
    <p style={{
       marginLeft: "5rem", 
      marginTop: '1rem', 
       fontSize: '0.9rem',
       color: "red", fontWeight: 'bolder', fontFamily: "Quicksand, sans-serif" }}>Invalid Email Kindly Enter Correct Email</p>
  )}

{emailSent && (
    <div style={{ 
      marginLeft: "5rem", 
      marginTop: '1rem', 
       fontSize: '0.9rem',
       color: "0B2447", fontWeight: 'bolder', fontFamily: "Quicksand, sans-serif" }}>
      <p>Email sent successfully. Please check your inbox for the reset password link. <br/>
      email link will expire in 3 minutes
      </p>
    </div>
  )}
      </Box>

      

  {/* {!emailSent && error && (
    <p style={{ marginLeft: "51rem", marginTop: '-8.5rem', fontSize: '1rem', fontWeight: 'bolder', fontFamily: "Quicksand, sans-serif" }}>Invalid Email Kindly Enter Correct Email</p>
  )} */}

  {!emailSent && !error && (
    <div>
      {/* { //this space for writing something} */}
    </div>
  )}
    </div>
  );
};

export default ForgetPassword;