import React, { useState } from "react";
import { Box } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BasicCard from "../components/BasicCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TappointLink from "../components/TappointLink";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Sidebar from "../global/Sidebar";
const styles = {
  container: {
    maxWidth: 1500,
    marginTop: "-1% !important",
    padding: "20px",
    margin: "0 auto",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 280px)",
    rowGap: "15px",
    marginRight: "-31rem",
    columnGap: "300px",
    justifyContent: "center",
    marginTop: "90px !important",
    "@media (max-width: 1000px)": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      rowGap: "10px",
      columnGap: "10px",
    },
  },
  rightContainer: {
    backgroundColor: "#EEEEEE",
    padding: "10px",
    marginLeft: "10rem",
  },
};
const Home = ({ loggedIn }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };
  return (
    <>
  <Box
    sx={{
      ...styles.container,
      marginLeft: isSmallScreen ? 10 : theme.spacing(10),
    }}
  >
    <TappointLink />
    <Box
      sx={{
        ...styles.cardContainer,
        marginLeft: isSmallScreen ? 10 : theme.spacing(11),
      }}
      style={{
        marginTop: "0.5rem",
        marginLeft: isSmallScreen ? "-25rem" : "2.5rem",
        fontSize: isSmallScreen ? "0.5rem" : "2rem",
        fontWeight: "bolder",
      }}
    >
      <BasicCard />
      <BasicCard />
    </Box>
    <Card />
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          marginTop: isSmallScreen ? "2rem" : 0,
          marginLeft: isSmallScreen ? 0 : "15rem",
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Rating
          style={{
            borderRadius: "1rem",
            fontSize: isSmallScreen ? "2rem" : "4rem",
            marginTop: isSmallScreen ? 0 : "1rem",
          }}
          name="rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <Typography
          variant="h5"
          component="div"
          style={{
            marginTop: "0.5rem",
            marginLeft: isSmallScreen ? 0 : "2.5rem",
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            fontWeight: "bolder",
          }}
        >
          Overall Ratings
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: isSmallScreen ? "2rem" : "2.5rem",
          marginLeft: isSmallScreen ? 0 : "1rem",
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Typography
          style={{
            fontSize: isSmallScreen ? "2rem" : "2.5rem",
            marginTop: isSmallScreen ? "1rem" : "-1rem",
            fontWeight: "bolder",
            paddingLeft: isSmallScreen ? 0 : "5rem",
          }}
          variant="h5"
          component="div"
        >
          Micheal Clerk
        </Typography>
        <AccountCircleRoundedIcon
          style={{
            fontSize: isSmallScreen ? "36px" : "48px",
            marginTop: isSmallScreen ? 0 : "0.1rem",
            marginRight: "1rem",
          }}
          sx={{ color: "#008080", bgcolor: "white", borderRadius: "50%" }}
        />
        <Rating
          style={{ fontSize: isSmallScreen ? "2rem" : "2.5rem", marginTop: "0.1rem" }}
          name="rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <Typography
          style={{ fontSize: "2rem" }}
          variant="body"
          component="div"
        >
          Great experience! Made a same <br />
          day appointment
        </Typography>
      </Box>
    </Box>
  </Box>
</>
  );
};
export default Home;
