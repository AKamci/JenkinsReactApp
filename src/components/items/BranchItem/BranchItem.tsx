import * as React from 'react';
import { Tooltip, Zoom, useTheme } from '@mui/material';
import { JobDto } from '../../../infrastructure/dtos/JobDto';
import { useAppSelector, useAppDispatch } from '../../../infrastructure/store/store';
import { StyledCard, StyledCardContent, rotate } from './BranchStyle';
import { branchIcons } from './BranchIcons';
import { colorSchemes } from './BranchColorSchemes';
import { addBuildingJob } from '../../../infrastructure/store/slices/Notification/StartedBuildNotification-Slice';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { calculateSuccessRate, getFillColor } from './BranchTest';
import { GetTestResult } from '../../../infrastructure/store/slices/Test/GetTestResult-Slice';

const BranchItem: React.FC<{ job: JobDto }> = React.memo(({ job }) => {
  const dispatch = useAppDispatch();
  const isTestResultsOpen = useAppSelector((state) => state.getTestOpenClose.isOpen);
  const testResult = useAppSelector((state) => state.getTestResult.data[job.url]);
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const theme = useTheme();

  const colorScheme = useMemo(() => 
    colorSchemes[job.color as keyof typeof colorSchemes] || colorSchemes.default,
    [job.color]
  );

  const name = useMemo(() => job.name.toLowerCase(), [job.name]);
  const isBuilding = useMemo(() => job?.color?.includes('_anime') || false, [job.color]);
  const prevBuildingRef = useRef(isBuilding);

  useEffect(() => {
    if (isBuilding && !prevBuildingRef.current) {
      dispatch(addBuildingJob(job));
    }
    prevBuildingRef.current = isBuilding;
  }, [isBuilding, job, dispatch]);

  useEffect(() => {
    if (isTestResultsOpen && !testResult) {
      dispatch(GetTestResult({ url: job.url }));
    }
  }, [isTestResultsOpen, job.url, testResult, dispatch]);

  const branchType = useMemo(() => {
    return Object.keys(branchIcons).find(key => {
      if (key === 'unknown') return false;
      const icon = branchIcons[key as keyof typeof branchIcons];
      if ('matcher' in icon && typeof icon.matcher === 'function') {
        return icon.matcher(name);
      }
      return false;
    }) || 'unknown';
  }, [name]);

  if (!selectedBranchList.includes(branchType)) return null;

  const successRate = testResult ? calculateSuccessRate(testResult) : null;
  const fillHeight = successRate ? `${successRate}%` : '0%';
  const fillColor = getFillColor(successRate);

  const commonCardProps = useMemo(() => ({
    variant: "outlined" as const,
    className: isBuilding ? 'building' : '',
    sx: {
      borderRadius: '20px',
      width: 'fit-content',
      minWidth: 42,
      border: `0.5px solid ${colorScheme.color}`,
      background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
      boxShadow: `0 0 4px ${colorScheme.color}40`,
      order: branchIcons[branchType as keyof typeof branchIcons].order,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: `0 0 8px ${colorScheme.color}60`,
        borderColor: colorScheme.color
      },
      '&::after': isTestResultsOpen ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: fillHeight,
        background: `linear-gradient(180deg, ${fillColor}30 0%, ${fillColor}50 100%)`,
        transition: 'all 0.5s ease-in-out',
        zIndex: 0
      } : {}
    }
  }), [colorScheme.color, theme.palette.mode, theme.palette.background, isBuilding, branchType, isTestResultsOpen, fillHeight, fillColor]);

  const getFeatureName = useCallback((name: string) => {
    if (name.startsWith('feature/')) {
      const decodedName = decodeURIComponent(name);
      const parts = decodedName.split('/');
      if (parts.length > 1) {
        const featurePart = parts[1].split('.')[0];
        return featurePart;
      }
    }
    return decodeURIComponent(name);
  }, []);

  const handleClick = useCallback(() => {
    if (job.lastBuild?.url) {
      window.open(job.lastBuild.url, '_blank');
    }
  }, [job.lastBuild?.url]);

  const tooltipTitle = useMemo(() => {
    if (isBuilding) return `Build Ediliyor -> ${job.name}`;
    if (isTestResultsOpen && successRate !== null) return `${name} - Başarı Oranı: ${successRate}%`;
    return name.startsWith('feature') ? getFeatureName(name) : branchIcons[branchType as keyof typeof branchIcons].label;
  }, [isBuilding, job.name, isTestResultsOpen, successRate, name, getFeatureName, branchType]);

  const iconElement = useMemo(() => {
    const IconComponent = branchIcons[branchType as keyof typeof branchIcons].icon;
    return React.createElement(IconComponent, {
      sx: {
        fontSize: 20,
        color: colorScheme.color,
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
        transition: 'all 0.2s ease',
        animation: isBuilding ? `${rotate} 2s linear infinite` : 'none',
        position: 'relative',
        zIndex: 1,
        '&:hover': {
          transform: isBuilding ? 'scale(1.1)' : 'scale(1.1) rotate(3deg)',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))'
        }
      }
    });
  }, [branchType, colorScheme.color, isBuilding]);

  return (
    <Tooltip 
      title={tooltipTitle}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <StyledCard
        {...commonCardProps}
        isDarkMode={isDarkMode}
        onClick={handleClick}
      >
        <StyledCardContent sx={{ display: 'flex', alignItems: 'center', padding: '2px 6px', position: 'relative', zIndex: 1 }}>
          {iconElement}
        </StyledCardContent>
      </StyledCard>
    </Tooltip>
  );
});

export default BranchItem;
