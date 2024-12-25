import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SidebarComponent from '../../../settings/SettingsSideBar';
import NotificationPopper from '../../../information/InformationPopper';
import StartedBuildNotification from '../../../notification/StartedBuildNotification';
import { useAppSelector } from '../../../../infrastructure/store/store';
import Search from '../../../SearchBar/Search';

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
  const [infoPopperOpen, setInfoPopperOpen] = useState<boolean>(false);
  const [notificationPopperOpen, setNotificationPopperOpen] = useState<boolean>(false);
  const infoAnchorRef = useRef<HTMLElement | null>(null);
  const notificationAnchorRef = useRef<HTMLElement | null>(null);
  const buildingJobs = useAppSelector((state) => state.getStartedBuildNotification.buildingJobs);
  const notificationCount = buildingJobs.length;

  const toggleSettingsSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };

  const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setInfoPopperOpen((prev) => !prev);
    infoAnchorRef.current = event.currentTarget;
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationPopperOpen((prev) => !prev);
    notificationAnchorRef.current = event.currentTarget;
  };

  const handleInfoPopperClose = () => {
    setInfoPopperOpen(false);
  };

  const handleNotificationPopperClose = () => {
    setNotificationPopperOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
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

          <Search />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StyledIconButton
              aria-label="bilgiler"
              onClick={handleInfoClick}
            >
              <InfoIcon />
            </StyledIconButton>
            <StyledIconButton
              aria-label="bildirimler"
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </StyledIconButton>
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
      <NotificationPopper
        anchorEl={infoAnchorRef.current}
        open={infoPopperOpen}
        onClose={handleInfoPopperClose}
      />
      <StartedBuildNotification
        anchorEl={notificationAnchorRef.current}
        open={notificationPopperOpen}
        onClose={handleNotificationPopperClose}
      />
    </div>
  );
};

export default React.memo(Navbar);