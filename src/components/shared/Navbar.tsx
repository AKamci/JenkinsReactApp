import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarComponent from '../settings/SettingsSideBar';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  },
}));

const Navbar: React.FC = () => {
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(false);

  return (
    <div>
      <AppBar position="static" sx={{ boxShadow: 2, backgroundColor: '#1F1F1F' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side - Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setVisibleSidebar(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Center - Search Box */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          <IconButton
            color="inherit"
            onClick={() => setVisibleSidebar(true)}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SidebarComponent visible={visibleSidebar} onHide={() => setVisibleSidebar(false)} />
    </div>
  );
};

export default React.memo(Navbar);
