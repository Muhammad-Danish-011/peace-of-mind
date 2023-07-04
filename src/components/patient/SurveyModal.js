import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

const SurveyModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSurvey = () => {
    console.log('User wants to fill out the mental health survey');
    navigate('/survey');
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
          style={{
            margin: '190px 0',
            width: '90ch',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)', // Adjust positioning after centering
          }}
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: '#d7eded',
              borderRadius: '0.5rem',
              height: '300px',
              width: '90ch',
            },
          }}
        >
          <h2 style={{ fontSize: '24px', margin: '36px 0' }}>Take our Mental Health Survey!</h2>
          <p style={{ fontSize: '16px', margin: '34px 0' }}>We care about your well-being and would like to invite you to take our mental health survey.</p>
          <Button sx={{ color: '#008080' }} onClick={handleSurvey}>Fill out survey</Button>
          <Button sx={{ color: '#008080' }} onClick={handleClose}>Skip</Button>
        </Menu>
      </div>
    </div>
  );
};

export default SurveyModal;
