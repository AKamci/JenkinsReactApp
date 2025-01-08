import React from 'react';
import { Menu, MenuItem, TextField, Button, Box } from '@mui/material';

interface RoomMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  newRoomName: string;
  onNewRoomNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateRoom: () => void;
  onLeaveRoom: () => void;
  isInRoom: boolean;
}

export const RoomMenu: React.FC<RoomMenuProps> = ({
  anchorEl,
  onClose,
  newRoomName,
  onNewRoomNameChange,
  onCreateRoom,
  onLeaveRoom,
  isInRoom
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, minWidth: 250 }}>
        <TextField
          fullWidth
          size="small"
          label="Oda Adı"
          value={newRoomName}
          onChange={onNewRoomNameChange}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={onCreateRoom}
          disabled={!newRoomName.trim()}
        >
          Oda Oluştur
        </Button>
        {isInRoom && (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={onLeaveRoom}
            sx={{ mt: 1 }}
          >
            Odadan Ayrıl
          </Button>
        )}
      </Box>
    </Menu>
  );
}; 