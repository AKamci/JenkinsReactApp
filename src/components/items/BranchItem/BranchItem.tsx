import * as React from 'react';
import { Tooltip, Zoom } from '@mui/material';
import { JobDto } from '../../../infrastructure/dtos/JobDto';
import { useAppSelector } from '../../../infrastructure/store/store';
import { StyledCard, StyledCardContent, rotate } from './BranchStyle';
import { branchIcons } from './BranchIcons';
import { colorSchemes } from './BranchColorSchemes';
import { darkTheme, lightTheme } from '../../../theme/theme';
import JenkinsJobColor from '../../../infrastructure/Enums/JenkinsJobColor';

const BranchItem: React.FC<{ job: JobDto }> = ({ job }) => {
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const colorScheme = colorSchemes[job.color as keyof typeof colorSchemes] || colorSchemes.default;
  const name = job.name.toLowerCase();
  const isBuilding = job.color === JenkinsJobColor.blue_anime || job.color === JenkinsJobColor.red_anime;

  let branchType = Object.keys(branchIcons).find(key => {
    const icon = branchIcons[key as keyof typeof branchIcons];
    if ('matcher' in icon && typeof icon.matcher === 'function') {
      return icon.matcher(name);
    }
    return name.includes(key);
  });

  const branchInfo = branchType ? branchIcons[branchType as keyof typeof branchIcons] : null;

  if (!branchInfo || !selectedBranchList.includes(branchType!)) return null;

  const commonCardProps = {
    variant: "outlined" as const,
    className: isBuilding ? 'building' : '',
    sx: {
      borderRadius: '20px',
      width: 'fit-content',
      minWidth: 42,
      border: `0.1px solid ${colorScheme.shadow}`,
      background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
      boxShadow: `0 0px 0px ${colorScheme.shadow}80, inset 0 1px 2px rgba(255,255,255,0.8)`,
      order: branchInfo.order
    }
  };

  const commonIconProps = {
    sx: {
      fontSize: 20,
      color: colorScheme.color,
      filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
      transition: 'all 0.2s ease',
      animation: isBuilding ? `${rotate} 2s linear infinite` : 'none',
      '&:hover': {
        transform: isBuilding ? 'scale(1.1)' : 'scale(1.1) rotate(3deg)',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))'
      }
    }
  };
  
  return (
    <Tooltip 
      title={isBuilding ? `Build Ediliyor -> ${job.name}` : (name.startsWith('feature') ? job.name : branchInfo.label)}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <StyledCard
        {...commonCardProps}
        onClick={() => job.lastBuild.url && window.open(job.lastBuild.url, '_blank')}
      >
        <StyledCardContent sx={{ display: 'flex', alignItems: 'center', padding: '2px 6px' }}>
          <branchInfo.icon {...commonIconProps} />
        </StyledCardContent>
      </StyledCard>
    </Tooltip>
  );
};

export default BranchItem;
