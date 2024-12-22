import React, { useEffect } from 'react';
import { Popper, Paper, Typography, ClickAwayListener, Box, Badge, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BuildIcon from '@mui/icons-material/Build';
import { useAppSelector } from '../../infrastructure/store/store';

interface StartedBuildNotificationProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const StartedBuildNotification: React.FC<StartedBuildNotificationProps> = ({ anchorEl, open, onClose }) => {
    const buildingJobs = useAppSelector((state) => state.getStartedBuildNotification.buildingJobs);
    
    useEffect(() => {
      console.log('Current building jobs:', buildingJobs.map(job => ({
        name: job.name,
        url: job.url
      })));
    }, [buildingJobs]);

  const handleJobClick = (url: string) => {
    window.open(url, '_blank');
  };

  const parseJobPath = (url: string) => {
    const cleanUrl = url.replace(/^https?:\/\/[^\/]+\/job\//, '');
    const parts = cleanUrl.split('/job/').filter(Boolean);
    return parts.map(p => p.replace(/\/$/, '')).join(' → ');
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
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Badge color="primary" sx={{ mr: 2 }}>
              <NotificationsIcon sx={{ fontSize: '2rem', color: '#1a73e8' }} />
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
              Bildirimler
            </Typography>
          </Box>
          
          {buildingJobs.length > 0 ? (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {buildingJobs.map((job, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleJobClick(job.url)}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.12)',
                    }
                  }}
                >
                  <BuildIcon sx={{ mr: 2, color: '#1a73e8' }} />
                  <ListItemText
                    primary={
                      <Typography
                      
                        sx={{
                          fontWeight: 'medium',
                          color: 'primary.main',
                          fontSize: '0.95rem'
                        }}
                      >
                        {parseJobPath(job.url)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 3,
                color: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)',
                borderRadius: 1
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                Henüz bildirim bulunmamaktadır.
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Yeni yapılar başladığında burada görünecektir.
              </Typography>
            </Box>
          )}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default StartedBuildNotification;