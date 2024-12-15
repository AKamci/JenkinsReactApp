import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarComponent from '../settings/SettingsSideBar';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 4,
  backgroundColor: alpha(theme.palette.common.white, 0.06),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.6),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create(['width', 'background-color']),
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
    padding: theme.spacing(1.2),
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.6),
      opacity: 1,
      letterSpacing: '0.5px',
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  padding: '8px',
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'translateY(-1px)',
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
          background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 1.5rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StyledIconButton
              edge="start"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </StyledIconButton>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Projelerde ara..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
            <StyledIconButton
              onClick={toggleSettingsSidebar}
            >
              <SettingsIcon />
            </StyledIconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SidebarComponent visible={visibleSidebar} onHide={() => setVisibleSidebar(false)} />
    </div>
  );
};

export default React.memo(Navbar);