import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CloseIcon from '@mui/icons-material/Close';
import Home from '../pages/home/Home';
import Councler from '../pages/councler/Councler';
import Calendar from '../pages/calendar/Calendar';

const Sidebar = styled('div')(
  {
    width: '90px',
    height: '100vh',
    backgroundColor: '#a0d4d4', 
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(-100%)',
  },
  ({ open }) => ({
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
  })
);

const SidebarIcon = styled(Box)(({ selected }) => ({
  marginBottom: '16px !important',
  color: selected ? '#008080' : 'white',
  '&:hover': {
    color: '#008080',
  },
  fontSize: 32, // or any other value you prefer
}));
const CloseIconWrapper = styled('div')({
    position: 'absolute',
    top: '70px',
    transform: 'translateY(8px)',
  });
  

export default function PersistentDrawerLeft() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState('home');

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setSidebarOpen(false); // Close the sidebar when an item is clicked
  };

  return (
    <Box sx={{ position:'relative' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          onClick={handleSidebarToggle}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Sidebar style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }} open={sidebarOpen}>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'home'} onClick={() => handleComponentChange('home')}>
          <HomeIcon />
        </SidebarIcon>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'councler'} onClick={() => handleComponentChange('councler')}>
          <PsychologyRoundedIcon />
        </SidebarIcon>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'calendar'} onClick={() => handleComponentChange('calendar')}>
          <CalendarMonthRoundedIcon />
        </SidebarIcon>
        <CloseIconWrapper>
            <SidebarIcon component={IconButton} color="primary" onClick={() => setSidebarOpen(false)}>
              <CloseIcon />
            </SidebarIcon>
          </CloseIconWrapper>

      </Sidebar>
      {selectedComponent === 'home' && <Home/>}
      {selectedComponent === 'councler' && <Councler />}
      {selectedComponent === 'calendar' && <Calendar />}
    </Box>
  );
}
