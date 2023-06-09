import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const ProfileModal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/user-profile')
  }

  const handleLogout = () =>{
    setAnchorEl(null);
    sessionStorage.clear()
    navigate("/login")
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
        <AccountCircleRoundedIcon style={{ fontSize: '48px' }} sx={{ color: '#008080', bgcolor: 'white', borderRadius: '50%'  }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: '200px',
              width: '20ch'
            }
          }}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileModal;
