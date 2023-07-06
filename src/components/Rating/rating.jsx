import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
const StyledRating = styled(Rating)({
  color: "#FFD700",
  fontSize: "2rem",
});

const theme = createTheme({
  palette: {
    // background: {
    //   default: "#C2F8E4", // Replace with your desired background color
    // },
  },
});

const RatingUI = ({ value, onChange }) => {
  const [rating, setRating] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [temp, setTemp] = useState(false);
  const Nav = useNavigate();

  const handleRatingChanging = (event) => {
    setRating(event.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleRate = ()=>{
    // console.log('hi')
    Nav(`/home`)
  } 
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = () => {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
    const currentDateTime = new Date(Date.now() - timezoneOffset).toISOString();
    console.log(currentDateTime);
    const newRating = {
      created: currentDateTime,
      updated: currentDateTime,
      appointment_id: 1,
      value: rating,
      note: comment,
    };

      fetch("http://ratingapp-env.eba-f5gxzjhm.us-east-1.elasticbeanstalk.com/rating/add", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRating),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Rating and comment saved successfully!");
          setTemp(true);

          setComment("");
          setIsDialogOpen(true);
        } else {
          throw new Error("Error saving rating and comment");
        }
      })
      .catch((error) => {
        console.error("Error saving rating and comment:", error);
      });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {temp ? (
          <div>
            {" "}
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#fff",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
              }}
            >
              <h1>
                {" "}
                Thanks for feedback
                <br />
                <button variant = "outlined" style={{ backgroundColor:'#8fb3ac', 
                marginLeft: "8px",
                padding:'10px',
                borderRadius:'8px',
                marginTop:'30px',
               border:'none'
                 }} onClick={() => handleRate()}>
                  Click here to go on Dashboard
                </button>
              </h1>
            </Box>
          </div>
        ) : (
          <div style={{backgroundColor:'#ffff'}}>
            <div>
              <Box
                sx={{
                  display: "flex",
                  // backgroundColor: "#C2F8E4",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <h1>Rating</h1>
                <p>Selected Rating: {rating}</p>
              </Box>
            </div>
            <Box
              sx={{
                display: "flex",
                // backgroundColor: "#C2F8E4",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
              }}
            >
              <StyledRating
                name="rating"
                value={value}
                onChange={handleRatingChanging}
              />
              <br />
              <br />
              <h4>Add Comments:</h4>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows={4}
                cols={50}
                placeholder="Add a comment..."
              />
              <br />
              <br />

              <Button
                onClick={handleFormSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <br />
              <br />

              <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Thanks for rating and comment</DialogTitle>
                <DialogContent>
                  {/* Additional content can be added here if needed */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} autoFocus>
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default RatingUI;
