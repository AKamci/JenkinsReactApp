import React from 'react';
import { List, ListItemButton, ListItemText, Tooltip, Typography, Badge, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../infrastructure/store/store';
import { alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

interface QueueInformationProps {
  onItemClick: (url: string) => void;
}

const QueueInformation: React.FC<QueueInformationProps> = ({ onItemClick }) => {
  const QueueItems = useAppSelector((state) => state.getQueueItems.builds);
  const folderNames = import.meta.env.VITE_FOLDER_NAME?.split(',').map((name: string) => name.trim().toLowerCase()) || [];

  const getFormattedTaskName = (url: string) => {
    const parts = url.split('/job/').filter(Boolean);
    return parts.slice(1).join('->');
  };

  const filteredQueueItems = QueueItems.items?.filter(item => {
    const taskName = getFormattedTaskName(item.task.url).split('->')[0].toLowerCase();
    return !folderNames.includes(taskName);
  });

  return (
    <Accordion sx={{ 
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:before': {
        display: 'none',
      }
    }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#1a73e8' }} />}
        sx={{
          padding: 0,
          minHeight: 'unset',
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1a73e8',
          }}
        >
          <AccessTimeIcon sx={{ fontSize: '1.3rem' }} />
          Sıradaki İşler ({filteredQueueItems?.length || 0})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, mt: 2 }}>
        <Box sx={{ 
          backgroundColor: alpha('#1a73e8', 0.04), 
          borderRadius: 2, 
          p: 2,
          border: theme => `1px solid ${theme.palette.divider}`
        }}>
          <List sx={{ pt: 0 }}>
            {filteredQueueItems?.map((item, index) => (
              <Tooltip
                key={index}
                title={
                  <Box sx={{ p: 1.5, maxWidth: 300 }}>
                    <Box component="div" sx={{ color: '#fff', mb: 1, fontWeight: 500, fontSize: '0.875rem' }}>
                      İş Detayları
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box component="span" sx={{ color: '#fff', fontSize: '0.75rem' }}>
                        Bloklandı: {item.blocked ? 'Evet' : 'Hayır'}
                      </Box>
                      <Box component="span" sx={{ color: '#fff', fontSize: '0.75rem' }}>
                        Sebep: {item.why}
                      </Box>
                      <Box component="span" sx={{ color: '#fff', fontSize: '0.75rem' }}>
                        Kuyruk Zamanı: {new Date(item?.inQueueSince).toLocaleString()}
                      </Box>
                    </Box>
                  </Box>
                }
                arrow
                placement="left"
              >
                <ListItemButton
                  onClick={() => onItemClick(item.task.url)}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: theme => theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.15)
                        : 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                        bgcolor: theme => theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.25)
                            : 'rgba(25, 118, 210, 0.12)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 'medium',
                            color: 'primary.main',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          {getFormattedTaskName(item.task.url)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                          <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                            {item.actions?.[0]?.causes?.[0]?.shortDescription || 'Bilinmiyor'}
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                          <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                            {new Date(item?.inQueueSince).toLocaleTimeString('tr-TR')}
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default QueueInformation;