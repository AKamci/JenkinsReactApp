import React from 'react';
import { Popper, Paper, Typography, ClickAwayListener, Divider, Box, Badge } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useAppSelector } from '../../infrastructure/store/store';
import QueueNotification from './QueueInformation';
import LastBuildsNotification from './LastBuildsInformation';
import BuildingJobNotification from './BuildingJobInformation';

interface InformationPopperProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const InformationPopper: React.FC<InformationPopperProps> = ({ anchorEl, open, onClose }) => {
  const QueueItems = useAppSelector((state) => state.getQueueItems.builds);

  const handleItemClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" style={{ zIndex: 1300 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={8}
          sx={{
            padding: 2.5,
            width: 380,
            maxHeight: '80vh',
            overflow: 'auto',
            borderRadius: 2,
            background: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)'
              : 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
            boxShadow: theme => theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.12)',
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Badge badgeContent={QueueItems.items?.length || 0} color="primary" sx={{ mr: 2 }}>
              <InfoIcon sx={{ fontSize: '2rem', color: '#1a73e8' }} />
            </Badge>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1a73e8, #0d47a1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Bilgilendirme
            </Typography>
          </Box>

          <QueueNotification onItemClick={handleItemClick} />

          <Divider sx={{ my: 3 }} />

          <BuildingJobNotification />

          <Divider sx={{ my: 3 }} />

          <LastBuildsNotification />
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default InformationPopper;