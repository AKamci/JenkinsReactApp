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
import { useScreenSize } from '../../../hooks/useScreenSize';

const BranchItem: React.FC<{ job: JobDto }> = React.memo(({ job }) => {
  const dispatch = useAppDispatch();
  const isTestResultsOpen = useAppSelector((state) => state.getTestOpenClose.isOpen);
  const testResult = useAppSelector((state) => state.getTestResult.data[job.url]);
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const { scaling } = useScreenSize();
  const theme = useTheme();

  const name = useMemo(() => job.name.toLowerCase(), [job.name]);
  const isBuilding = useMemo(() => job?.color?.includes('_anime') || false, [job.color]);
  const prevBuildingRef = useRef(isBuilding);
  const prevTestResultRef = useRef(testResult);

  const colorScheme = useMemo(() => 
    colorSchemes[job.color as keyof typeof colorSchemes] || colorSchemes.default,
    [job.color]
  );

  const branchType = useMemo(() => {
    if (!name) return 'unknown';
    return Object.entries(branchIcons).find(([key, icon]) => {
      if (key === 'unknown') return false;
      return 'matcher' in icon && typeof icon.matcher === 'function' && icon.matcher(name);
    })?.[0] || 'unknown';
  }, [name]);

  useEffect(() => {
    if (!isBuilding || prevBuildingRef.current) return;
    const timeoutId = setTimeout(() => {
      dispatch(addBuildingJob(job));
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [isBuilding, job, dispatch]);

  useEffect(() => {
    if (!isTestResultsOpen || testResult || !job.url) return;
    
    let isSubscribed = true;
    const controller = new AbortController();

    const fetchTestResults = async () => {
      try {
        if (!isSubscribed) return;
        await dispatch(GetTestResult({ 
          url: job.url,
        }));
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Error fetching test results:', error);
      }
    };

    fetchTestResults();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [isTestResultsOpen, job.url, testResult, dispatch]);

  useEffect(() => {
    prevBuildingRef.current = isBuilding;
    prevTestResultRef.current = testResult;
  }, [isBuilding, testResult]);

  const isMergedAndDeleted = useMemo(() => {
    if (job.lastBuild?.result === 'SUCCESS' && name.includes('feature/')) {
      const isOldBuild = job.lastBuild.timestamp && 
        (Date.now() - job.lastBuild.timestamp > 7 * 24 * 60 * 60 * 1000);
      return isOldBuild || job.color === 'disabled';
    }
    return false;
  }, [job.lastBuild, job.color, name]);

  if (isMergedAndDeleted || !selectedBranchList.includes(branchType)) return null;

  const testMetrics = useMemo(() => {
    if (!testResult) return { successRate: null, fillHeight: '0%', fillColor: null };
    const successRate = calculateSuccessRate(testResult);
    return {
      successRate,
      fillHeight: successRate ? `${successRate}%` : '0%',
      fillColor: getFillColor(successRate)
    };
  }, [testResult]);

  const styles = useMemo(() => ({
    card: {
      variant: "outlined" as const,
      className: isBuilding ? 'building' : '',
      sx: {
        borderRadius: `${20 * scaling}px`,
        width: 'fit-content',
        minWidth: 42 * scaling,
        border: `${0.5 * scaling}px solid ${colorScheme.color}`,
        background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
        boxShadow: `0 0 ${4 * scaling}px ${colorScheme.color}40`,
        order: branchIcons[branchType as keyof typeof branchIcons]?.order || 0,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: `0 0 ${8 * scaling}px ${colorScheme.color}60`,
          borderColor: colorScheme.color
        },
        '&::after': isTestResultsOpen ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: testMetrics.fillHeight,
          background: testMetrics.fillColor ? 
            `linear-gradient(180deg, ${testMetrics.fillColor}30 0%, ${testMetrics.fillColor}50 100%)` : 
            'none',
          transition: 'all 0.5s ease-in-out',
          zIndex: 0
        } : {}
      }
    },
    cardContent: {
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: `${4 * scaling}px ${8 * scaling}px`, 
      position: 'relative',
      minHeight: 32 * scaling,
      zIndex: 1
    },
    icon: {
      fontSize: 20 * scaling,
      color: colorScheme.color,
      filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
      transition: 'all 0.2s ease',
      animation: isBuilding ? `${rotate} 2s linear infinite` : 'none',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        transform: isBuilding ? 'scale(1.1)' : 'scale(1.1) rotate(3deg)',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.12))'
      }
    }
  }), [colorScheme.color, theme.palette.mode, theme.palette.background, isBuilding, branchType, isTestResultsOpen, testMetrics, scaling]);

  const getFeatureName = useCallback((branchName: string) => {
    if (!branchName.startsWith('feature/')) return decodeURIComponent(branchName);
    
    const decodedName = decodeURIComponent(branchName);
    const parts = decodedName.split('/');
    return parts.length > 1 ? parts[1].split('.')[0] : decodedName;
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (!job.url) return;

    if (event.ctrlKey) {
      const allureUrl = `${job.url}allure/`;
      const newWindow = window.open(allureUrl, '_blank');
      if (newWindow) {
        newWindow.focus();
      }
      return;
    }

    const targetUrl = job.lastBuild?.url || job.url;
    if (!targetUrl) return;

    const newWindow = window.open(targetUrl, '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  }, [job.lastBuild?.url, job.url]);

  const handleWheel = useCallback((event: React.WheelEvent) => {
    const targetUrl = job.lastBuild?.url || job.url;
    if (!targetUrl) return;
    
    event.preventDefault();
    window.open(targetUrl, '_blank', 'noopener');
  }, [job.lastBuild?.url, job.url]);

  const handleAuxClick = useCallback((event: React.MouseEvent) => {
    const targetUrl = job.lastBuild?.url || job.url;
    if (!targetUrl) return;
    
    if (event.button === 1) {
      event.preventDefault();
      window.open(targetUrl, '_blank', 'noopener');
    }
  }, [job.lastBuild?.url, job.url]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (event.button === 1) {
      event.preventDefault();
    }
  }, []);

  const tooltipTitle = useMemo(() => {
    if (isBuilding) return `Build Ediliyor -> ${job.name}`;
    if (isTestResultsOpen && testMetrics.successRate !== null) {
      return `${name} - Başarı Oranı: ${testMetrics.successRate}%`;
    }
    return name.startsWith('feature') ? 
      getFeatureName(name) : 
      branchIcons[branchType as keyof typeof branchIcons]?.label || name;
  }, [isBuilding, job.name, isTestResultsOpen, testMetrics.successRate, name, branchType]);

  const iconElement = useMemo(() => {
    const IconComponent = branchIcons[branchType as keyof typeof branchIcons]?.icon;
    if (!IconComponent) return null;
    return <IconComponent sx={styles.icon} />;
  }, [branchType, styles.icon]);

  return (
    <Tooltip 
      title={tooltipTitle}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <StyledCard
        {...styles.card}
        isDarkMode={isDarkMode}
        scaling={scaling}
        onClick={handleClick}
        onWheel={handleWheel}
        onAuxClick={handleAuxClick}
        onMouseDown={handleMouseDown}
      >
        <StyledCardContent sx={styles.cardContent} scaling={scaling}>
          {iconElement}
        </StyledCardContent>
      </StyledCard>
    </Tooltip>
  );
});

BranchItem.displayName = 'BranchItem';

export default BranchItem;
