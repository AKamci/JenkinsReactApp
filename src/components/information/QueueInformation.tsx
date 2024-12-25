import React from 'react';
import { List, ListItemButton, ListItemText, Tooltip, Typography, Badge, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../infrastructure/store/store';
import { alpha } from '@mui/material/styles';

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
        <Box sx={{ backgroundColor: alpha('#1a73e8', 0.04), borderRadius: 2, p: 2 }}>
          <List sx={{ pt: 0 }}>
            {filteredQueueItems?.map((item, index) => (
              <Tooltip
                key={index}
                title={
                  <Box sx={{ p: 1.5, maxWidth: 300 }}>
                    <Typography variant="body2" sx={{ color: '#fff', mb: 1, fontWeight: 500 }}>
                      İş Detayları
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#fff', mb: 0.5 }}>
                      Bloklandı: {item.blocked ? 'Evet' : 'Hayır'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#fff' }}>
                      Sebep: {item.why}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#fff', mb: 0.5 }}>
                      Kuyruk Zamanı: {new Date(item.inQueueSince).toLocaleString()}
                    </Typography>
                  </Box>
                }
                arrow
                placement="left"
              >
                <ListItemButton
                  onClick={() => onItemClick(item.task.url)}
                  sx={{
                    borderRadius: 1.5,
                    mb: 1,
                    py: 1,
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        {getFormattedTaskName(item.task.url)}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Badge
                          variant="dot"
                          color="primary"
                          sx={{ '& .MuiBadge-dot': { backgroundColor: '#4caf50' } }}
                        />
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          #{item.actions[0].causes[0].shortDescription}
                        </Typography>
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