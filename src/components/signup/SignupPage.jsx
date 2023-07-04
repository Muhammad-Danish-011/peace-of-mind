import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
    cnic: "",
    password: "",
    gender: "",
    role: "",
    specialization: "",
    description: "",
    guardian_phone_number: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
    cnic: "",
    password: "",
    gender: "",
    role: "",
    specialization: "",
    description: "",
    guardian_phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors) {
      setErrors(formErrors);
    } else {
      const signupDateTime = new Date();
      // Submit the form data
      try {
        const newUser = {
          firstName: formData.fname,
          lastName: formData.lname,
          phoneNumber: formData.phone,
          address: formData.address,
          email: formData.email,
          nationalId: formData.cnic,
          password: formData.password,
          gender: formData.gender,
          role: formData.role,
          created: signupDateTime.toISOString(),
        };
        const accountUrl = process.env.REACT_APP_API_KEY
        console.log(accountUrl)
        const response = await fetch(`${accountUrl}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          console.log("New User is registered!!!");
          if (formData.role === "COUNSELOR") {
            let user = await response.json();
            console.log(user)
            const counselorData = {
              created: signupDateTime.toISOString(),
              specialization: formData.specialization,
              description: formData.description,
              userId: user.id
            };
            const councelorUrl = process.env.REACT_APP_COUNSELOR_API_KEY
            console.log(councelorUrl)
            const counselorResponse = await fetch(
              `${councelorUrl}/counselor/post`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(counselorData),
              }
            );
            if (counselorResponse.ok) {
              console.log("Counselor data is saved!");
            } else {
              console.log("Failed to save counselor data.");
            }
          } else if (formData.role === "PATIENT") {
            let user = await response.json();
            console.log(user)
            const patientData = {
              guardian_phone_number: formData.guardian_phone_number,
              userId: user.id
            };

            const patientUrl = process.env.REACT_APP_PATIENT_API_KEY
            console.log(patientUrl)
            const patientResponse = await fetch(
              `${patientUrl}/patient/add`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(patientData),
              }
            );
            if (patientResponse.ok) {
              console.log("Patient data is saved!");
            } else {
              console.log("Failed to save patient data.");
            }
          }
          console.log(formData);
          resetForm();
        } else {
          setErrorMessage("Email Or CNIC is already Registered try new one");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    const formErrors = {};
    const {
      fname,
      lname,
      phone,
      address,
      email,
      cnic,
      password,
      gender,
      role,
      specialization,
      description,
      guardian_phone_number,
    } = formData;

    if (!fname) {
      formErrors.fname = "First Name is required";
    }

    if (!lname) {
      formErrors.lname = "Last Name is required";
    }

    const phoneRegex = /^\d{11}$/;
    if (!phone) {
      formErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone= "Invalid Phone format (e.g., 0300-0000000)";
    }
    if (!address) {
      formErrors.address = "Address is required";
    }
    if (!gender) {
      formErrors.gender = "Gender is required";
    }
    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    if (!cnic) {
      formErrors.cnic = "CNIC is required";
    } else if (!cnicRegex.test(cnic)) {
      formErrors.cnic = "Invalid CNIC format (e.g., 12345-1234567-1)";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }
     else if (password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    }
    if (!role) {
      formErrors.role = "Role is required";
    }
    if (role === "COUNSELOR" && !specialization) {
      formErrors.specialization = "Specialization is required";
    }
    if (role === "COUNSELOR" && !description) {
      formErrors.description = "Description is required";
    }
    if (role === "PATIENT" && !guardian_phone_number) {
      formErrors.guardian_phone_number = "Guardian Phone Number is required";
    }
    if (Object.keys(formErrors).length > 0) {
      return formErrors;
    }
    return null;
  };

  const resetForm = () => {
    setFormData({
      fname: "",
      lname: "",
      phone: "",
      address: "",
      email: "",
      cnic: "",
      password: "",
      gender: "",
      role: "",
      specialization: "",
      description: "",
      guardian_phone_number: "",
    });
    setErrors({
      fname: "",
      lname: "",
      phone: "",
      address: "",
      email: "",
      cnic: "",
      password: "",
      gender: "",
      role: "",
      specialization: "",
      description: "",
      guardian_phone_number: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/plan_background.jpeg'})`,
        backgroundSize: "cover",
        '@media (max-width: 1090px)': {
          display: "flex",
          flexDirection: "column",
          margin: "1%",
          justifyContent: "center",
        }
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
          paddingLeft: "1rem",
        }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "3.7rem",
            fontWeight: "bolder",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            '@media (max-width: 840px)': {
            
              flexDirection: "column",
           fontSize: "40px",
              justifyContent: "center",
              alignSelf: "center",
            },
            '@media (max-width: 350px)': {
       
              flexDirection: "column",
               fontSize: "25px",
              justifyContent: "center",
              alignSelf: "center",
            }
          }}>
          PEACE OF MIND
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1.2rem",
            fontWeight: "bolder",
            // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}>
          It's okay not to be okay
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          paddingTop: "1rem",
          maxWidth: "600px",
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0px 3px 15px rgba(113,115,119,0.7)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",

          '@media (max-width: 620px)': {
            display: "flex",
            flexDirection: "column",
            maxWidth: "90%",
            justifyContent: "center",
          }
        }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "2rem",
            fontWeight: "bolder",
          }}>
          Sign Up
        </Typography>

        <form onSubmit={handleFormSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <img
               src={formData.role === "COUNSELOR" ? `${process.env.PUBLIC_URL + '/images/doctor.png'}` : `${process.env.PUBLIC_URL + '/images/patient.png'}`}
              alt="role"
              style={{ width: "100px", marginBottom: "0.5rem" }}
            />

            <FormControl component="fieldset" error={!!errors.role} required>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}>
                <FormControlLabel
                  value="COUNSELOR"
                  control={<Radio />}
                  label="Counselor"
                />
                <FormControlLabel
                  value="PATIENT"
                  control={<Radio />}
                  label="Patient"
                />
              </RadioGroup>
              {!!errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ paddingLeft: "3rem",
         
          
          '@media (max-width: 610px)': {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "0rem"
          }
         }}>
            <TextField
              styles={{ margin: "2rem", border: "2px solid red" }}
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              error={!!errors.fname}
              helperText={errors.fname}
              required
              sx={{ mb: 1,
                '@media (max-width: 610px)': {
                  mb: 2
                }
              }}

            />
            <TextField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              error={!!errors.lname}
              helperText={errors.lname}
              required
              sx={{ mb: 1, 
                ml: 2,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                }
               }}
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              sx={{ mb: 1 ,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                }}}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              sx={{ mb: 1, ml: 2 ,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                }}}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{ mb: 1,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                } }}
                
            />
            {errors.email && (
                  <span style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.email}
                  </span>
                )}
            <TextField
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              error={!!errors.cnic}
              helperText={errors.cnic}
              required
              sx={{ mb: 1, ml: 2 ,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                }}}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              required
              sx={{ mb: 1,
                '@media (max-width: 610px)': {
                  mb: 2,
                  ml: 0
                } }}
            />
            {formData.role === "COUNSELOR" && (
              <>
                <TextField
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  error={!!errors.specialization}
                  helperText={errors.specialization}
                  required={formData.role === "COUNSELOR"}
                  sx={{ mb: 1, ml: 2,
                    '@media (max-width: 610px)': {
                      mb: 2,
                      ml: 0
                    } }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  required={formData.role === "COUNSELOR"}
                  sx={{ mb: 1,
                    '@media (max-width: 610px)': {
                      mb: 2,
                      ml: 0
                    }}}
                />
              </>
            )}
            {formData.role === "PATIENT" && (
              <TextField
                label="Guardian Phone Number"
                name="guardian_phone_number"
                value={formData.guardian_phone_number}
                onChange={handleInputChange}
                error={!!errors.guardian_phone_number}
                helperText={errors.guardian_phone_number}
                required={formData.role === "PATIENT"}
                sx={{ mb: 1, ml: 2 ,
                  '@media (max-width: 610px)': {
                    mb: 2,
                    ml: 0
                  }
                }}
              />
            )}
            <br />

            <FormControl
              component="fieldset"
              error={!!errors.gender}
              sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ display: "inline-block", marginRight: "1rem" }}>
                Select the gender:
              </Typography>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}>
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              {!!errors.gender && (
                <Typography variant="caption" color="error">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
            {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center" }}>
              {errorMessage}
            </p>
          )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1,
         }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                '@media (max-width: 610px)': {
                  width: "70%",
                 
                },
                width: "25%",
                backgroundColor: "black",
                color: "white",
                
                "&:hover": {
                  backgroundColor: "#333",
                  '@media (max-width: 610px)': {
                    width: "70%",
                   
                  }
                },
              }}>
              Sign Up
            </Button>
          </Box>
        </form>
        <p
          style={{
            fontFamily: "Quicksand, sans-serif",

            fontSize: "13px",
            fontWeight: "bold",
            color: "black",
            margin: "1rem",
          }}>
          Already have an account? <a href="/login">Sign in now</a>
        </p>
      </Box>
    </Box>
  );
};

export default SignupForm;


