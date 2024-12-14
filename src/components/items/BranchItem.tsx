import * as React from 'react';
import { Card, CardContent, styled, Tooltip, Zoom, keyframes } from '@mui/material';
import { DeveloperMode, CheckCircle, Science, Rocket, BugReport } from '@mui/icons-material';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { useAppSelector } from '../../infrastructure/store/store';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(4, 150, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(4, 150, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(4, 150, 255, 0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '2px 0',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(8px)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1.5px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
    transition: 'transform 0.3s ease',
    transform: 'translateX(-100%)'
  },
  '&:hover': {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    '&:before': {
      transform: 'translateX(100%)'
    }
  },
  '&.building': {
    animation: `${pulse} 2s infinite`,
    background: 'rgba(255,244,222,0.95)' 
  }
}));

const StyledCardContent = styled(CardContent)({
  padding: '4px 10px !important',
  '&:last-child': { paddingBottom: '4px !important' }
});

const colorSchemes = {
  red: { 
    color: '#ff4d6d',
    shadow: '#ffe0e6',
    gradient: '#fff5f7'
  },
  blue: {
    color: '#0496ff',
    shadow: '#e6f4ff',
    gradient: '#f0f9ff'
  },
  blue_anime: {
    color: '#ffa726', 
    shadow: '#fff4e5',
    gradient: '#fff8e1'
  },
  green: {
    color: '#02c39a',
    shadow: '#e6fff7',
    gradient: '#f0fff9'
  },
  default: {
    color: '#6c757d',
    shadow: '#f8f9fa',
    gradient: '#fdfdfd'
  }
};

const branchIcons = {
  dev: { icon: <DeveloperMode />, label: 'dev' },
  stable: { icon: <CheckCircle />, label: 'stable' },
  stage: { icon: <Science />, label: 'stage' },
  prod: { icon: <Rocket />, label: 'prod' },
  main: { icon: <Rocket />, label: 'main' },
  feature: { icon: <BugReport />, label: 'feature' }
};

const BranchItem: React.FC<{ job: JobDto }> = ({ job }) => {
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);
  const colorScheme = colorSchemes[job.color as keyof typeof colorSchemes] || colorSchemes.default;
  const name = job.name.toLowerCase();
  const branchType = Object.keys(branchIcons).find(key => name.includes(key));
  const branchInfo = branchType ? branchIcons[branchType as keyof typeof branchIcons] : null;
  const isBuilding = job.color === 'blue_anime';

  if (!branchInfo || !selectedBranchList.includes(branchType!)) return null;

  return (
    <Tooltip 
      title={isBuilding ? 'Build Ediliyor...' : branchInfo.label}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <StyledCard
        variant="outlined"
        onClick={() => job.url && window.open(job.url, '_blank')}
        className={isBuilding ? 'building' : ''}
        sx={{
          borderRadius: '8px',
          width: 'fit-content',
          minWidth: 36,
          border: `1px solid ${colorScheme.shadow}`,
          background: `linear-gradient(135deg, ${colorScheme.gradient}40, rgba(255,255,255,0.95))`,
          boxShadow: `0 2px 8px ${colorScheme.shadow}80, inset 0 1px 2px rgba(255,255,255,0.9)`
        }}
      >
        <StyledCardContent sx={{ display: 'flex', alignItems: 'center', padding: '3px 8px' }}>
          {React.cloneElement(branchInfo.icon, { 
            sx: { 
              fontSize: 16,
              color: colorScheme.color,
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
              transition: 'all 0.2s ease',
              animation: isBuilding ? `${rotate} 2s linear infinite` : 'none',
              '&:hover': { 
                transform: isBuilding ? 'scale(1.1)' : 'scale(1.1) rotate(3deg)',
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))'
              }
            } 
          })}
        </StyledCardContent>
      </StyledCard>
    </Tooltip>
  );
};

export default BranchItem;
