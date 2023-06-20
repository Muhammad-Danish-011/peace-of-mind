import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Modal, Box, Typography, Button, Grid } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css'

const Navbar = ({ handleSidebarToggle }) => {
  const [open, setOpen] = useState(false); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <AppBar position="relative" style={{marginTop:'-10px',height:'10vh'}} sx={{ bgcolor: '#8fb3ac' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open sidebar"
                onClick={handleSidebarToggle}
                edge="start"
              >
                <MenuIcon style={{ fontSize: '48px' }}/>
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton edge="end" color="inherit" onClick={handleOpen}>
                <AccountCircleRoundedIcon style={{ fontSize: '48px' }} sx={{ color: '#008080', bgcolor: 'white', borderRadius: '50%'  }} />
              </IconButton>
            </Grid>
          </Grid>

          {/* Modal dialog box */}
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography variant="h6">User Profile</Typography>
              <Typography variant="body1">Name: Aoun ali</Typography>
              <Typography variant="body1">Email: Aounali@gmail.com</Typography>
              <Button onClick={handleClose}
               variant='outlined'
              sx= {{color: 'black',
             borderRadius:'20px', 
              display:'flex',
             marginLeft:'40px',
              marginTop:'10px',
             fontSize:'8px',
              padding:'8px',
              bgcolor: 'white'}}
            size="small" >Log out</Button>
            </Box>
          </Modal>

        </Toolbar>
      </AppBar>
  )
}

export default Navbar;
