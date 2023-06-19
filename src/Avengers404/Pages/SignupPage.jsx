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
import plan_background from "../images/plan_background.jpeg";
import doctor from "../images/doctor.png";
import patient from "../images/patient.png";
import "./SignUp.module.css";

const SignupForm = () => {
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
      // Submit the form data
      try {
        const response = await fetch("http://localhost:8082/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("New User is registered!!!");
          if (formData.role === "COUNSELOR") {
            const counselorData = {
              specialization: formData.specialization,
              description: formData.description,
            };
            const counselorResponse = await fetch(
              "http://localhost:8081/counselor/post",
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
            const patientData = {
              guardian_phone_number: formData.guardian_phone_number,
            };
            const patientResponse = await fetch(
              "http://patient-app.us-west-2.elasticbeanstalk.com/patient/add",
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
          console.log("Some error occurred");
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

    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      formErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone = "Invalid phone number";
    }

    if (!address) {
      formErrors.address = "Address is required";
    }

    if (!gender) {
      formErrors.gender = "Gender is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email address";
    }

    const cnicRegex = /^\d{5}-\d{7}-\d$/;
    if (!cnic) {
      formErrors.cnic = "CNIC is required";
    } else if (!cnicRegex.test(cnic)) {
      formErrors.cnic = "Invalid CNIC format (e.g., 12345-1234567-1)";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
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

    // Add more validation rules for other form fields

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
        backgroundImage: `url(${plan_background})`,
        backgroundSize: "cover",
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
            fontSize: "3.2rem",
            fontWeight: "bolder",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}>
          PEACE OF MIND
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1rem",
            fontWeight: "bolder",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
              src={formData.role === "COUNSELOR" ? doctor : patient}
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
          <Box sx={{ paddingLeft: "3rem" }}>
            <TextField
              styles={{ margin: "2rem", border: "2px solid red" }}
              label="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              error={!!errors.fname}
              helperText={errors.fname}
              required
              sx={{ mb: 1 }}
            />
            <TextField
              label="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              error={!!errors.lname}
              helperText={errors.lname}
              required
              sx={{ mb: 1, ml: 2 }}
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              sx={{ mb: 1 }}
            />

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              sx={{ mb: 1, ml: 2 }}
            />
            {/* <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              sx={{ mb: 1 }}
            /> */}
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              sx={{ mb: 1 }}
            />
            <TextField
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              error={!!errors.cnic}
              helperText={errors.cnic}
              required
              sx={{ mb: 1, ml: 2 }}
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
              sx={{ mb: 1 }}
            />

            {/* from role is here */}
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
                  sx={{ mb: 1, ml: 2 }}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  required={formData.role === "COUNSELOR"}
                  sx={{ mb: 1, ml: 13 }}
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
                sx={{ mb: 1, ml: 2 }}
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "25%",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
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

