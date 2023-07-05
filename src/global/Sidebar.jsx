import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded';
import HomeIcon from '@mui/icons-material/Home';
import ProfileModal from '../components/patient/ProfileModal';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';

const Sidebar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const role = sessionStorage.getItem('role');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
<AppBar position="static" sx={{ backgroundColor: '#96bebe' }}>
      <Toolbar   disableGutters>
       

        <Box sx={{ flexGrow: 1,   display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{color: '#008080'}}          >
           <MenuIcon style={{ fontSize: '48px' }}/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
            onClick={handleCloseNavMenu}
          >
            {role === 'PATIENT' ? (
              <>
                <MenuItem component={Link} to="/home">
                  <IconButton sx={{color: '#008080'}}>
                    <HomeIcon style={{ fontSize: '48px' }} />
                  </IconButton>
                </MenuItem>
                <MenuItem component={Link} to="/appointments">
                  <IconButton sx={{color: '#008080'}}>
                    <CalendarMonthRoundedIcon style={{ fontSize: '48px' }} />
                  </IconButton>
                </MenuItem>
                <MenuItem component={Link} to="/surveyform">
                  <IconButton sx={{color: '#008080'}}>
                    <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
                  </IconButton>
                </MenuItem>
              </>
              ) : (
                <>
                  <MenuItem component={Link} to="/home">
                    <IconButton sx={{color: '#008080'}}>
                      <HomeIcon style={{ fontSize: '48px' }} />
                    </IconButton>
                  </MenuItem>
                  <MenuItem component={Link} to="/counselor">
                    <IconButton sx={{color: '#008080'}}>
                      <PsychologyRoundedIcon style={{ fontSize: '48px' }} />
                    </IconButton>
                  </MenuItem>
                  <MenuItem component={Link} to="/Calendar">
                    <IconButton sx={{color: '#008080'}}>
                      <CalendarMonthRoundedIcon style={{ fontSize: '48px' }} />
                    </IconButton>
                  </MenuItem>
                  <MenuItem component={Link} to="/availibilitytable">
                    <IconButton sx={{color: '#008080'}}>
                      <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
                    </IconButton>
                  </MenuItem>
                </>
              )}
          </Menu>
        </Box>
       
        <Box sx={{ flexGrow: 1, justifyContent:'center', display: { xs: 'none', md: 'flex' } }} onClick={handleCloseNavMenu}>
        {role === 'PATIENT' ? (
            <>
              <Link to="/home">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <HomeIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
              <Link to="/appointments">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <CalendarMonthRoundedIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
              <Link to="/surveyform">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/home">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <HomeIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
              <Link to="/counselor">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <PsychologyRoundedIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
              <Link to="/Calendar">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <CalendarMonthRoundedIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
              <Link to="/availibilitytable">
                <MenuItem component={IconButton} sx={{color: '#008080'}}>
                  <FormatAlignJustifyRoundedIcon style={{ fontSize: '48px' }} />
                </MenuItem>
              </Link>
            </>
          )}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
            <ProfileModal/>
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;
