import React from 'react';
import { Tabs, Tab, Box, Badge } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import { Room } from './types';

interface RoomTabsProps {
  currentTab: string;
  rooms: Room[];
  username: string;
  onTabChange: (newValue: string) => void;
  onJoinRoom: (roomId: string) => void;
}

export const RoomTabs: React.FC<RoomTabsProps> = ({
  currentTab,
  rooms,
  username,
  onTabChange,
  onJoinRoom
}) => {
  return (
    <Tabs
      value={currentTab}
      onChange={(_, newValue) => onTabChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        minHeight: 'auto',
        '& .MuiTabs-scroller': {
          overflow: 'hidden',
          borderRadius: '8px',
        },
        '& .MuiTab-root': {
          minHeight: '36px',
          py: 0.5,
          px: 2,
          color: 'white',
          opacity: 0.7,
          transition: 'all 0.2s ease-in-out',
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            opacity: 0.9,
          },
          '& .MuiTab-iconWrapper': {
            marginRight: 1,
          }
        },
        '& .MuiTabs-indicator': {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          height: '3px',
          borderRadius: '1.5px',
        }
      }}
    >
      <Tab 
        icon={<PublicIcon fontSize="small" />}
        iconPosition="start"
        label={
          <Box sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
            Global
          </Box>
        }
        value="global"
      />
      {rooms.map(room => (
        <Tab
          key={room.id}
          icon={<GroupIcon fontSize="small" />}
          iconPosition="start"
          label={
            <Box sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
              {room.name}
              {!room.members.includes(username) && (
                <Badge
                  color="error"
                  variant="dot"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
          }
          value={room.id}
          onClick={() => {
            if (!room.members.includes(username)) {
              onJoinRoom(room.id);
            }
          }}
        />
      ))}
    </Tabs>
  );
}; 