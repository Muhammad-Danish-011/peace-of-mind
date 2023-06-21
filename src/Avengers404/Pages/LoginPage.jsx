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

  // if(sessionStorage.getItem("islogin") != null){
    
  //   window.location.assign("/home");
  // }
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setLoginStatus,setitems } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    try {
      const response = await fetch("http://accountservice.us-east-1.elasticbeanstalk.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem("role", user.role);
        console.log(user.role);
        setLoginStatus(true);

        if (user.role === "PATIENT") {
          navigate("/dashboard");
        } else if (user.role === "COUNSELOR") {
          navigate("/home");
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





















// import React, { useContext, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import bg from "../images/bg.jpeg";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   TextField,
//   Button,
//   FormControl,
// } from "@mui/material";

// const Loginform = () => {
//   const navigate = useNavigate();
//   const { setLoginStatus } = useContext(AuthContext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({ email: '', password: '' });

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);

//     if (emailError || passwordError) {
//       setErrors({ email: emailError, password: passwordError });
//       return;
//     }

//     console.log('Login successful');

//     fetch('http://localhost:8082/user/login', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('Login Successfully');
//           setLoginStatus(true); // Set login status to true
//           setTimeout(() => {
//             navigate('/dashboard'); // Navigate to dashboard
//           }, 3000);  // Navigate to dashboard
//         } else {
//           console.log('Login Fail');
//           setLoginStatus(false); // Set login status to false
//         }
//       })
//       .catch((error) => {
//         console.error('Error', error);
//         setLoginStatus(false); // Set login status to false in case of an error
//       });
//   };

//   const validateEmail = (email) => {
//     if (!email) {
//       return 'Email is required';
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       return 'Invalid email address';
//     }
//     return '';
//   };

//   const validatePassword = (password) => {
//     if (!password) {
//       return 'Password is required';
//     }
//     if (password.length < 8) {
//       return 'Password should be at least 8 characters long';
//     }
//     return '';
//   };

//   // if (isLoggedIn) {
//   //   return null; // Render nothing if already logged in
//   // }

//   return (
//     <>
//       <div
//         className="login-container"
//         style={{
//           backgroundImage: `url(${bg})`,
//           backgroundPosition: "center",
//           height:'100vh',
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           // height: "100vh",
//           boxSizing: "border-box",
//           // "@media screen and (max-width: 600px)": {
//           //   // flexDirection: "column",
//           //   // width:"160vh",
//           //   justifyContent: "center",
//           //   marginLeft:'-5rem'
//           // },
//         }}
//       >
//         <Box  
//           component="form"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             "@media screen and (max-width: 600px)": {
//               // flexDirection: "column",
//               width:'30vh',
//               marginLeft:"-2rem",
//               justifyContent: "center",
//             },
//             "& .MuiTextField-root": {
//               m: 1,
//               width: "18rem",
//               backgroundColor: "white",
//               border: "none",
//               color: "black",
//               borderRadius: "10px",
//               borderColor: "#b0d2cb",
//               "@media screen and (max-width: 600px)": {
//                 // flexDirection: "column",
//                 width:'35vh',
//                 marginLeft:"-4rem",
//                 justifyContent: "center",
//               },
              
//             }
//           }}
//           noValidate
//           autoComplete="on"
//         >
//           <div style={{ marginLeft: "37%"
        
//           }}>
//             <div style={{ marginTop: "13%",marginLeft:'12rem'  }}>
//               <h2
//                 style={{
//                   fontFamily: "Quicksand, sans-serif",
//                   fontSize: "2.8rem",
//                   fontWeight: "bolder",
                  
//                   textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//                 }}
//               >
//                 PEACE OF MIND
//               </h2>
//               <p
//                 style={{
//                   marginTop: "-35px",
//                   fontFamily: "Quicksand, sans-serif",
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                   marginLeft:'3.5rem',
//                 }}
//               >
//                 It's okay not to be okay
//               </p>
//             </div>
//             <h1
//               style={{
//                 marginTop: "7%",
//                 fontFamily: "Quicksand, sans-serif",
//                 fontSize: "1.8rem",
//                 fontWeight: "bolder",
//                 marginLeft:'18rem',
//               }}
//             >
//               Login Now
//             </h1>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginBottom: "19px",
//                 borderRadius: "10px",
//                 borderColor: "white"
//               }}
//             ></div>
//           </div>
//           <div style={{ marginLeft: "50%" }}>
//             <label style={{ marginLeft: "1rem", fontSize: "1.1rem",fontWeight:'bolder' ,fontFamily:"Quicksand, sans-serif" }}>
//               Enter Your Email:
//             </label>
//             <br />
//             {/* Email Field */}
//             <FormControl error={Boolean(errors.email)} sx={{ width: "500px" }}>
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Email Address"
//                 required
//                 sx={{
//                   width: "200px",
//                   "& label": {
//                     fontSize: "0.8rem",
//                   },
//                   "& fieldset": {
//                     color: "black",

//                     borderRadius: "10px",
//                     borderColor: "white",
//                   },
//                 }}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <span style={{ color: "red", fontSize: "0.8rem" }}>
//                   {errors.email}
//                 </span>
//               )}
//             </FormControl>
//           </div>

//           <div style={{ marginLeft: "50%", marginTop: "10px"  ,fontFamily:"Quicksand, sans-serif" }}>
//             <label style={{ marginLeft: "1rem", fontSize: "1.1rem",fontWeight:'bolder' }}>
//               Enter Your Password:
//             </label>
//             <br />
//             <FormControl
//               error={Boolean(errors.password)}
//               sx={{ width: "500px" }}
//             >
//               <TextField
//                 id="outlined-multiline-flexible"
//                 label="Password"
//                 type="password"
//                 required
//                 sx={{
//                   width: "200px",
//                   "& label": {
//                     fontSize: "0.8rem",
//                   },
//                   "& fieldset": {
//                     color: "black",

//                     borderRadius: "10px",
//                     borderColor: "white",
//                   },
//                 }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {errors.password && (
//                 <span
//                   style={{
//                     color: "red",
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   {errors.password}
//                 </span>
//               )}
//             </FormControl>
//           </div>

//           <div>
//             <a
//               href="/forget-password"
//               style={{
//                 marginLeft: "56rem",
//                 fontFamily: "Quicksand, sans-serif",
//                 fontSize: "15px",
//                 fontWeight: "bold",
//                 color: "black",
//                 textDecoration: "none",

//               }}
//             >
//               Forgotten Password?
//             </a>
//           </div>

//           <div
//             style={{
//               marginBottom: "20px",
//               borderRadius: "10px",
//               // marginLeft: "600px",
//             }}
//           ></div>

//           <Button
//             type="submit"
//             onClick={handleLogin}
//             style={{
//               borderRadius: "10px",
//               marginLeft: "60rem",
//               padding: "5px",
//               width: "80px",
//               marginTop: "15px",
//               color: "black",
//               fontSize: "20px",
//               fontFamily: "Quicksand, sans-serif",
//               backgroundColor: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//               border: "1px solid black",
//             }}
//           >
//             Login
//           </Button>
//           <p
//             style={{
//               marginLeft: "50rem",
//               paddingTop: "18px",
//               marginBottom: "30px",
//               fontFamily: "Quicksand, sans-serif",
//               fontSize: "0.9rem",
//               fontWeight: "bolder",
//               color: "black",
//             }}
//           >
//             Don't have an account? <a href="/">SignUp</a>
//           </p>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default Loginform;