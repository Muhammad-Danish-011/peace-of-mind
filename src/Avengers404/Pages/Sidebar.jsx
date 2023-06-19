import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import Home from './Home';
import { IconButton } from '@mui/material';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = styled('div')(
  {
    height: '103vh',
    backgroundColor: '#8fb3ac',
    // position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(-100%)',
    '@media (max-width: 600px)': {
      width: '90px',
    },
    '@media (min-width: 601px) and (max-width: 960px)': {
      width: '90px',
    },
    '@media (min-width: 961px)': {
      width: '120px',
    },
  },
  ({ open }) => ({
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
  })
);

const SidebarIcon = styled(Box)(({ selected }) => ({
  marginBottom: '60px !important',
  color: selected ? '#008080' : 'white',
  '&:hover': {
    color: '#008080',
  },
}));


const CloseIconWrapper = styled('div')({
  position: 'absolute',
  top: '65px',
  left: '20px',
  transform: 'translateY(-50%)',
});

export default function PersistentDrawerLeft() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // This effect runs whenever the location changes (i.e. the user navigates to a new URL)
    const path = location.pathname.slice(1); // Remove the leading "/"
    setSelectedComponent(path || 'home'); // If there's no path, default to the home component
  }, [location.pathname]);

  const handleSidebarToggle = () => {
    setSidebarOpen(true);
  };

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    navigate(`/${component}`);
  };

  return (
    <Box sx={{ position: 'fixed' }}>
      <Navbar handleSidebarToggle={handleSidebarToggle} />
      <Sidebar style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }} open={sidebarOpen}>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'home'} onClick={() => handleComponentChange('home')}>
        <HomeIcon style={{ fontSize: '48px' }} />
        </SidebarIcon>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'councler'} onClick={() => handleComponentChange('councler')}>
          <PsychologyRoundedIcon style={{ fontSize: '48px' }} />
        </SidebarIcon>
        <SidebarIcon component={IconButton} color="primary" selected={selectedComponent === 'calendar'} onClick={() => handleComponentChange('calendar')}>
          <CalendarMonthRoundedIcon style={{ fontSize: '48px' }}  />
        </SidebarIcon>
      </Sidebar>
      {sidebarOpen && (
        <CloseIconWrapper>
          <SidebarIcon component={IconButton} color="primary" onClick={() => setSidebarOpen(false)}>
            <CloseIcon style={{ fontSize: '38px' }} />
          </SidebarIcon>
        </CloseIconWrapper>
      )}
      {selectedComponent === 'home' && <Home />}
      {/* {selectedComponent === 'councler' && <Councler />}
      {selectedComponent === 'calendar' && <Calendar />} */}
    </Box>
  );
}