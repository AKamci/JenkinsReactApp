import * as React from 'react';
import { Tooltip, Zoom, useTheme } from '@mui/material';
import { JobDto } from '../../../infrastructure/dtos/JobDto';
import {  useAppSelector, useAppDispatch } from '../../../infrastructure/store/store';
import { StyledCard, StyledCardContent, rotate } from './BranchStyle';
import { branchIcons } from './BranchIcons';
import { colorSchemes } from './BranchColorSchemes';
import JenkinsJobColor from '../../../infrastructure/Enums/JenkinsJobColor';
import { addBuildingJob, removeBuildingJob } from '../../../infrastructure/store/slices/Notification/StartedBuildNotification-Slice';
import { useEffect, useRef } from 'react';

const BranchItem: React.FC<{ job: JobDto }> = ({ job }) => {
  const dispatch = useAppDispatch();
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const theme = useTheme();
  const colorScheme = colorSchemes[job.color as keyof typeof colorSchemes] || colorSchemes.default;
  const name = job.name.toLowerCase();
  const isBuilding = job.color === JenkinsJobColor.blue_anime || job.color === JenkinsJobColor.red_anime;
  const prevBuildingRef = useRef(isBuilding);
  
  useEffect(() => {
    if (isBuilding && !prevBuildingRef.current) {
      console.log('Adding job:', {
        name: job.name,
        url: job.url
      });
      dispatch(addBuildingJob(job));
    } else if (!isBuilding && prevBuildingRef.current) {
      console.log('Removing job:', {
        name: job.name,
        url: job.url
      });
      dispatch(removeBuildingJob(job));
    }
    prevBuildingRef.current = isBuilding;
  }, [isBuilding, job, dispatch]);

  
  let branchType = Object.keys(branchIcons).find(key => {
    if (key === 'unknown') return false;
    const icon = branchIcons[key as keyof typeof branchIcons];
    if ('matcher' in icon && typeof icon.matcher === 'function') {
      return icon.matcher(name);
    }
    return false;
  }) || 'unknown';

  const branchInfo = branchIcons[branchType as keyof typeof branchIcons];

  if (!selectedBranchList.includes(branchType)) return null;

  const commonCardProps = {
    variant: "outlined" as const,
    className: isBuilding ? 'building' : '',
    sx: {
      borderRadius: '20px',
      width: 'fit-content',
      minWidth: 42,
      border: `0.5px solid ${colorScheme.color}`,
      background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
      boxShadow: `0 0 4px ${colorScheme.color}40`,
      order: branchInfo.order,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: `0 0 8px ${colorScheme.color}60`,
        borderColor: colorScheme.color
      }
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

  const getFeatureName = (name: string) => {
    if (name.startsWith('feature/')) {
      const match = name.match(/feature\/(.+)\./);
      if (match && match[1]) {
        return match[1];
      }
    }
    return name;
  };
  
  return (
    <Tooltip 
      title={isBuilding ? `Build Ediliyor -> ${job.name}` : (name.startsWith('feature') ? getFeatureName(name) : branchInfo.label)}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <StyledCard
        {...commonCardProps}
        isDarkMode={isDarkMode}
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
