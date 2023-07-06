import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import ProfileModal from '../components/patient/ProfileModal';


import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarWrapper = styled(AppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
  }),
  backgroundColor: '#8fb3ac', // Set the background color of the navbar here

}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',

}));

export default function PersistentDrawerLeft() {
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const location = useLocation();

  const role = sessionStorage.getItem('role');
// console.log(role)

React.useEffect(() => {

  // This effect runs whenever the location changes (i.e. the user navigates to a new URL)
  const path = location.pathname.slice(1); // Remove the leading "/"
  setSelectedComponent(path || 'counselor'); // If there's no path, default to the home component
}, [location.pathname]);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBarWrapper position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <ProfileModal />
         </Typography>
        </Toolbar>
      </AppBarWrapper>
      <Drawer
        sx={{
          width: drawerWidth,
            
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#8fb3ac', 

          },
        }}
       
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {role === "PATIENT" ? 
         <List 
         sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          '& > *': {
            margin: '40px 0',
          },
        }}
      >
         
           <Link to={'/home'}>
           <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
            <HomeIcon style={{ fontSize: '48px' }} />
            </ListItemButton>
        </Link>
        <Link to={'/appointments'}>
        <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
            <CalendarMonthRoundedIcon style={{ fontSize: '48px' }} />
            </ListItemButton>
        </Link>
        <Link to={'/surveyform'}>
        <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
            <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
            </ListItemButton>
        </Link>
        </List>
              : 
              <List 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                '& > *': {
                  margin: '16px 0',
                },
              }}
            >
              <Link to={'/counselor'}>
              <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
                  <HomeIcon style={{ fontSize: '48px' }} />
                  </ListItemButton>
              </Link>
      
              <Link to={'/Calendar'}>
              <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
                  <PsychologyRoundedIcon style={{ fontSize: '48px' }} />
                  </ListItemButton>
              </Link>
      
              
              <Link to={'/availibilitytable'}>
              <ListItemButton component={ListItemIcon} sx={{ color: '#008080' }}>
                  <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
                  </ListItemButton>
              </Link>
              </List>
             }
        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Typography>
          
        </Typography>
      </Main>
    </Box>
  );
}
