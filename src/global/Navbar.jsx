import React from 'react'
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Navbar = () => {
  return (
      <AppBar position="static" sx={{ bgcolor: '#a0d4d4' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div/>
          <IconButton edge="end" color="inherit">
            <AccountCircleRoundedIcon sx={{ color: '#008080', bgcolor: 'white', borderRadius: '50%'  }} />
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
