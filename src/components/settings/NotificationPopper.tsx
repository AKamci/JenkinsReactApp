import React from 'react';
import { Popper, Paper, Typography, ClickAwayListener, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { RootState } from '../../infrastructure/store/store';
import { useSelector } from 'react-redux';

interface NotificationPopperProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const NotificationPopper: React.FC<NotificationPopperProps> = ({ anchorEl, open, onClose }) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" style={{ zIndex: 1300 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper sx={{ padding: 2, width: 300 }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
            Sıradaki İşler
          </Typography>
          <List>
            <ListItemButton>
              <ListItemText 
                primary="" 
                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
              />
            </ListItemButton>
          </List>
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 600 }}>
            Tamamlanan İşler
          </Typography>
          <List>
            <ListItemButton>
              <ListItemText 
                primary=""
                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
              />
            </ListItemButton>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default NotificationPopper;