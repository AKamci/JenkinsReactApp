import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SidebarComponent from '../settings/SettingsSideBar';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.12),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.7),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('width'),
  '& .MuiInputBase-input': {
    fontSize: '0.9rem',
    padding: theme.spacing(1),
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.5),
      opacity: 1,
    },
  },
}));

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(false);

  const toggleSettingsSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#1a237e',
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Ara..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> 
            <IconButton
              color="inherit"
              onClick={toggleSettingsSidebar} 
              sx={{ 
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SidebarComponent visible={visibleSidebar} onHide={() => setVisibleSidebar(false)} />
    </div>
  );
};

export default React.memo(Navbar);