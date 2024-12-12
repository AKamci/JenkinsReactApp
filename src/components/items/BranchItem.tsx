import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Card, CardContent, Typography, Box, Chip, styled } from '@mui/material';
import { 
  CodeRounded,
  DeveloperMode, // dev için
  CheckCircle, // stable için  
  Science, // stage için
  Rocket, // prod için
  BugReport // feature için
} from '@mui/icons-material';
import { red, grey, blue, green } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '2px 0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(250,250,250,0.9))',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    transform: 'translateX(2px) translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  }
}));

const StyledCardContent = styled(CardContent)({
  padding: '4px 8px !important',
  '&:last-child': {
    paddingBottom: '4px !important'
  }
});

const getColorScheme = (color: string) => {
  switch (color) {
    case 'red':
      return { border: red[100], text: red[700], bg: `rgba(${red[500]}, 0.08)` };
    case 'blue':
      return { border: blue[100], text: blue[700], bg: `rgba(${blue[500]}, 0.08)` };
    case 'green':
      return { border: green[100], text: green[700], bg: `rgba(${green[500]}, 0.08)` };
    default:
      return { border: grey[100], text: grey[700], bg: `rgba(${grey[500]}, 0.08)` };
  }
};

const getBranchIcon = (branchName: string) => {
  const name = branchName.toLowerCase();
  if (name === 'dev') return <DeveloperMode />;
  if (name === 'stable') return <CheckCircle />;
  if (name === 'stage') return <Science />;
  if (name === 'prod') return <Rocket />;
  if (name.startsWith('feature')) return <BugReport />;
  return null;
};

type BranchJobItemProps = {
  job: JobDto;
};

const BranchItem: React.FC<BranchJobItemProps> = ({ job }) => {
  const colorScheme = getColorScheme(job.color);
  const branchIcon = getBranchIcon(job.name);

  if (!branchIcon) return null;

  return (
    <StyledCard
      variant="outlined"
      sx={{
        borderColor: colorScheme.border,
        borderWidth: '1px',
        borderRadius: '6px',
        position: 'relative',
        overflow: 'hidden',
        width: 'fit-content',
        minWidth: 36,
        display: 'flex',
        alignItems: 'center',
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
      }}
    >
      <StyledCardContent sx={{ display: 'flex', alignItems: 'center', padding: '2px 6px' }}>
        {React.cloneElement(branchIcon, { 
          sx: { 
            fontSize: 16, 
            color: colorScheme.text, 
            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' 
          } 
        })}
      </StyledCardContent>
    </StyledCard>
  );
};

export default BranchItem;
