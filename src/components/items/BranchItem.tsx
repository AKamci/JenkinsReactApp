import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Card, CardContent, Typography, Box, Chip, styled, IconButton } from '@mui/material';
import { CodeRounded, LinkOutlined } from '@mui/icons-material';
import { red, grey, blue, green } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '1px 0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,250,250,0.9))',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    transform: 'translateX(2px) translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  }
}));

const StyledCardContent = styled(CardContent)({
  padding: '4px !important', 
  '&:last-child': {
    paddingBottom: '4px !important' 
  }
});

const StyledChip = styled(Chip)({
  height: '14px', 
  borderRadius: '7px', 
  '& .MuiChip-label': {
    fontSize: '0.55rem', 
    padding: '0 5px', 
    letterSpacing: '0.02em'
  }
});

const getColorScheme = (color: string) => {
  switch(color) {
    case 'red': return { border: red[100], text: red[700], bg: `rgba(${red[500]}, 0.08)` };
    case 'blue': return { border: blue[100], text: blue[700], bg: `rgba(${blue[500]}, 0.08)` };
    case 'green': return { border: green[100], text: green[700], bg: `rgba(${green[500]}, 0.08)` };
    default: return { border: grey[100], text: grey[700], bg: `rgba(${grey[500]}, 0.08)` };
  }
};

type BranchJobItemProps = {
  job: JobDto;
};

const BranchItem: React.FC<BranchJobItemProps> = ({ job }) => {
  const colorScheme = getColorScheme(job.color);

  const handleLinkClick = () => {
    window.open(`${job.url}`, '_blank');
  };

  return (
    <StyledCard variant="outlined" sx={{ 
      borderColor: colorScheme.border,
      borderWidth: '1px', 
      borderRadius: '6px', 
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '3px', 
        height: '100%',
        background: colorScheme.text,
        opacity: 0.8
      }
    }}>
      <StyledCardContent>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.6, 
          pl: 0.8 
        }}>
          <CodeRounded sx={{ 
            fontSize: 12, 
            color: colorScheme.text,
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
          }} />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500, 
              color: colorScheme.text,
              fontSize: '0.65rem', 
              flexGrow: 1,
              letterSpacing: '0.01em',
              textShadow: '0 1px 1px rgba(255,255,255,0.8)'
            }}
          >
            {job.name}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleLinkClick}
            sx={{ 
              color: colorScheme.text,
              padding: '1px', 
              background: colorScheme.bg,
              transition: 'all 0.2s ease',
              '&:hover': { 
                color: grey[900],
                transform: 'scale(1.05)', 
                background: `${colorScheme.bg}`
              }
            }}
          >
            <LinkOutlined sx={{ fontSize: 10 }} />
          </IconButton>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default BranchItem;
