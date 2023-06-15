import React  from 'react';
import { AppBar, IconButton, Toolbar,  Grid } from "@mui/material";
import './navbar.css'
import ProfileModal from '../components/ProfileModal';

const Navbar = ({ handleSidebarToggle }) => {

  
  return (
      <AppBar position="relative" sx={{ bgcolor: '#8fb3ac' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open sidebar"
                onClick={handleSidebarToggle}
                edge="start"
              >
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
            <ProfileModal/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar;
