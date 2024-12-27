import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, Typography, Fade, useTheme } from '@mui/material';
import { AccountTree } from '@mui/icons-material';
import BranchItem from './BranchItem/BranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '../../infrastructure/store/store';
import { useMemo, useEffect, useCallback } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';
import { branchIcons } from './BranchItem/BranchIcons';

interface JobDtoWithScore extends JobDto {
  onScoreChange?: (score: number) => void;
}

const RepositoryItem: React.FC<{ job: JobDtoWithScore; parent: string }> = React.memo(({ job, parent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    const fetchJobData = async () => {
      try {
        if (!isSubscribed) return;
        await dispatch(GetBranchJob({
          jobName: parent,
          jobName2: job.name,
          apiSettings
        }));
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        console.error('Error fetching branch job:', error);
      }
    };

    fetchJobData();
    const intervalId = setInterval(fetchJobData, 10000);
    
    return () => {
      isSubscribed = false;
      controller.abort();
      clearInterval(intervalId);
    };
  }, [dispatch, job.name, parent, apiSettings]);

  const getBranchType = useCallback((name: string): string => {
    const nameLower = name.toLowerCase();
    return Object.entries(branchIcons).find(([key, icon]) => {
      if (key === 'unknown') return false;
      return 'matcher' in icon && typeof icon.matcher === 'function' && icon.matcher(nameLower);
    })?.[0] || 'unknown';
  }, []);

  const getFilteredBranches = useMemo(() => {
    const jobs = BranchJobData[job.name]?.jobs;
    if (!jobs?.length) return [];

    interface AccumulatorType {
      featureBranches: JobDto[];
      otherBranches: JobDto[];
    }

    const { featureBranches, otherBranches } = jobs.reduce<AccumulatorType>((acc, branch) => {
      const branchType = getBranchType(branch.name);
      if (!selectedBranchList.includes(branchType)) return acc;

      if (branch.name.toLowerCase().startsWith('feature') && branch.lastBuild) {
        acc.featureBranches.push(branch);
      } else {
        acc.otherBranches.push(branch);
      }
      return acc;
    }, { featureBranches: [], otherBranches: [] });

    featureBranches.sort((a, b) => (b.lastBuild?.timestamp || 0) - (a.lastBuild?.timestamp || 0));

    return [...featureBranches.slice(0, featureCount), ...otherBranches];
  }, [BranchJobData, job.name, selectedBranchList, featureCount, getBranchType]);

  const getBranchColorCounts = useMemo(() => {
    if (!getFilteredBranches.length) return {};
    
    return getFilteredBranches.reduce((acc: { [key: string]: number }, branch) => {
      if (branch.color) {
        acc[branch.color] = (acc[branch.color] || 0) + 1;
      }
      return acc;
    }, {});
  }, [getFilteredBranches]);

  const getRepositoryScore = useMemo(() => {
    if (!getFilteredBranches.length) return 0;

    const scoreMap: Record<string, number> = {
      'red': 2,
      'yellow': 1,
      'blue': 0,
      'blue_anime': 0,
      'red_anime': 2,
      'yellow_anime': 1
    };

    return getFilteredBranches.reduce((total, branch) => {
      if (!branch.color) return total;
      const baseColor = branch.color.replace('_anime', '');
      return total + (scoreMap[baseColor] || 0);
    }, 0);
  }, [getFilteredBranches]);

  useEffect(() => {
    if (!job.onScoreChange) return;
    const currentScore = getRepositoryScore;
    const timeoutId = setTimeout(() => {
      job.onScoreChange(currentScore);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [getRepositoryScore, job.onScoreChange]);

  const styles = useMemo(() => ({
    card: {
      margin: '2px',
      borderRadius: '8px',
      boxShadow: theme.shadows[1],
      transition: 'all 0.2s ease',
      border: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        boxShadow: theme.shadows[3],
      },
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      padding: '0px 12px',
      gap: '8px',
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: isDarkMode ? 
        theme.palette.background.default : 
        theme.palette.action.hover,
    },
    branchBox: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px',
      padding: '2px',
      backgroundColor: theme.palette.background.default,
    },
    icon: {
      fontSize: '1rem',
      color: job.color || theme.palette.secondary.main,
      opacity: isDarkMode ? 0.9 : 0.7
    },
    text: {
      fontSize: '0.85rem',
      fontWeight: 500,
      opacity: isDarkMode ? 0.7 : 0.3,
      color: theme.palette.text.primary
    }
  }), [theme, isDarkMode, job.color]);

  const branchJobsExist = BranchJobData[job.name]?.jobs?.length > 0;

  return (
    <Fade in={true} timeout={300}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <AccountTree sx={styles.icon} />
          <Typography sx={styles.text}>{job.name}</Typography>
        </CardContent>
        
        {branchJobsExist && (
          <Box sx={styles.branchBox}>
            {getFilteredBranches.map((branchJob, index) => (
              <BranchItem key={`${branchJob.name}-${index}`} job={branchJob} />
            ))}
          </Box>
        )}
      </Card>
    </Fade>
  );
});

RepositoryItem.displayName = 'RepositoryItem';

export default RepositoryItem;