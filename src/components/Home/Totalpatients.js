import React from 'react';
import { Box, Typography } from "@mui/material";

const TotalPatients = ({ patientCount }) => {
  return (
    <Box
      sx={{
        border: "1px solid green",
        backgroundColor: 'rgb(207, 227, 223)',
        borderRadius: "10px",
        width: "20%",
        padding: "3%",
        '@media (max-width: 950px)': {
          width: "80%",
          alignSelf: "center",
          margin: "2rem auto",
          padding: "1rem",
        }
      }}
    >
      <Typography variant="h5">TOTAL NO. OF PATIENTS</Typography>
      <h1>{patientCount}</h1>
    </Box>
  );
};

export default TotalPatients;
