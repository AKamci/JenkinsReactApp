import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Card, CardContent, Typography, Box, Chip, styled, IconButton } from '@mui/material';
import { CodeRounded, TimerOutlined, LinkOutlined } from '@mui/icons-material';
import { red, grey, blue, green } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '4px 0',
  transition: 'all 0.2s ease',
  background: 'linear-gradient(145deg, #ffffff, #fafafa)',
  '&:hover': {
    transform: 'translateX(2px)',
    boxShadow: theme.shadows[2]
  }
}));

const StyledCardContent = styled(CardContent)({
  padding: '8px !important',
  '&:last-child': {
    paddingBottom: '8px !important'
  }
});

const StyledChip = styled(Chip)({
  height: '24px',
  '& .MuiChip-label': {
    fontSize: '0.7rem',
    padding: '0 6px'
  }
});

const getColorScheme = (color: string) => {
  switch(color) {
    case 'red':
      return {
        border: red[200],
        text: red[700],
        bg: red[50]
      };
    case 'blue':
      return {
        border: blue[200],
        text: blue[700],
        bg: blue[50]
      };
    case 'green':
      return {
        border: green[200],
        text: green[700],
        bg: green[50]
      };
    default:
      return {
        border: grey[200],
        text: grey[700],
        bg: grey[50]
      };
  }
};

type BranchJobItemProps = {
  job: JobDto;
};

const BranchItem: React.FC<BranchJobItemProps> = ({ job }) => {
  const colorScheme = getColorScheme(job.color);

  return (
    <StyledCard variant="outlined" sx={{ 
      borderColor: colorScheme.text, 
      borderWidth: '2px',
      borderRadius: '12px'
    }}>
      <StyledCardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ 
            borderRadius: '50%', 
            padding: '4px',
            backgroundColor: colorScheme.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CodeRounded sx={{ fontSize: 16, color: colorScheme.text }} />
          </Box>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  color: colorScheme.text,
                  fontSize: '0.85rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {job.name}
              </Typography>
              <IconButton 
                size="small" 
                sx={{ 
                  color: colorScheme.text, 
                  padding: '2px',
                  '&:hover': { color: grey[900] } 
                }}
              >
                <LinkOutlined sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
            <StyledChip
              icon={<TimerOutlined sx={{ fontSize: 12 }} />}
              label={job.lastBuild?.timestamp ? new Date(job.lastBuild.timestamp).toLocaleString() : 'Henüz build yok'}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: colorScheme.border,
                color: colorScheme.text,
                backgroundColor: colorScheme.bg,
              }}
            />
          </Box>
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default BranchItem;
