import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@mui/material';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ProfileCard from '../../pages/profileCard/ProfileCard'

const SurveyModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSurvey = () => {
    // Handle survey button click event
    console.log('User wants to fill out the mental health survey');

    // Navigate to ProfileCard component
    navigate('/surveyform');
  }

  return (
    <div>
      <div style={{ marginLeft: 'auto' }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <InsertDriveFileRoundedIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ paper: 'square-menu' }} // Add this line to set the menu as square
        >
          <h2 style={{ fontSize: '24px', margin: '16px 0' }}>Take our Mental Health Survey!</h2>
          <p style={{ fontSize: '16px', margin: '8px 0' }}>We care about your well-being and would like to invite you to take our mental health survey.</p>
          <MenuItem onClick={handleSurvey}>Fill out survey</MenuItem>
          <MenuItem onClick={handleClose}>Skip</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default SurveyModal;
