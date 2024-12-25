import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, Typography, Fade, useTheme } from '@mui/material';
import { AccountTree } from '@mui/icons-material';
import BranchItem from './BranchItem/BranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';
import { branchIcons } from './BranchItem/BranchIcons';

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);
  const selectedBranchList = useAppSelector((state) => state.getSelectedBranchList.selectedBranch);

  useEffect(() => {
    const fetchJobData = () => {
      dispatch(GetBranchJob({
        jobName: parent,
        jobName2: job.name,
        apiSettings,
      }));
    };

    fetchJobData();
    const intervalId = setInterval(fetchJobData, 10000);
    return () => clearInterval(intervalId);
  }, [dispatch, job.name, parent, apiSettings]);

  const getBranchType = (name: string): string => {
    return Object.keys(branchIcons).find(key => {
      if (key === 'unknown') return false;
      const icon = branchIcons[key as keyof typeof branchIcons];
      if ('matcher' in icon && typeof icon.matcher === 'function') {
        return icon.matcher(name.toLowerCase());
      }
      return false;
    }) || 'unknown';
  };

  const getFilteredBranches = () => {
    const jobs = BranchJobData[job.name]?.jobs;
    if (!jobs) return [];

    const visibleJobs = jobs.filter(branch => {
      const branchType = getBranchType(branch.name);
      return selectedBranchList.includes(branchType);
    });

    const featureBranches = visibleJobs
      .filter(branch => branch.name.toLowerCase().startsWith('feature') && branch.lastBuild)
      .sort((a, b) => (b.lastBuild?.timestamp || 0) - (a.lastBuild?.timestamp || 0))
      .slice(0, featureCount);

    const otherBranches = visibleJobs.filter(branch => !branch.name.toLowerCase().startsWith('feature'));

    return [...featureBranches, ...otherBranches];
  };
  
  const getBranchColorCounts = () => {
    const branches = getFilteredBranches();
    if (branches.length === 0) return {};
    
    return branches.reduce((acc: { [key: string]: number }, branch) => {
      if (branch.color) {
        acc[branch.color] = (acc[branch.color] || 0) + 1;
      }
      return acc;
    }, {});
  };

  const getRepositoryScore = () => {
    const filteredBranches = getFilteredBranches();
    const colorCounts = filteredBranches.reduce((acc: { [key: string]: number }, branch) => {
      if (branch.color) {
        acc[branch.color] = (acc[branch.color] || 0) + 1;
      }
      return acc;
    }, {});

    const scoreMap: { [key: string]: number } = {
      'red': 2,
      'yellow': 1,
      'blue': 0,
      'blue_anime': 0,
      'red_anime': 2,
      'yellow_anime': 1
    };

    return Object.entries(colorCounts).reduce((total, [color, count]) => {
      const baseColor = color.replace('_anime', '');
      return total + (scoreMap[baseColor] || 0) * count;
    }, 0);
  };

  React.useEffect(() => {
    if (job.onScoreChange) {
      job.onScoreChange(getRepositoryScore());
    }
  }, [BranchJobData, job]);

  return (
    <Fade in={true} timeout={300}>
      <Card
        sx={{
          margin: '2px',
          borderRadius: '8px',
          boxShadow: theme.shadows[1],
          transition: 'all 0.2s ease',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            boxShadow: theme.shadows[3],
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            padding: '0px 12px',
            gap: '8px',
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: isDarkMode ? 
              theme.palette.background.default : 
              theme.palette.action.hover,
          }}
        >
          <AccountTree 
            sx={{
              fontSize: '1rem',
              color: job.color || theme.palette.secondary.main,
              opacity: isDarkMode ? 0.9 : 0.7
            }}
          />
          <Typography 
            sx={{
              fontSize: '0.85rem',
              fontWeight: 500,
              opacity: isDarkMode ? 0.7 : 0.3,
              color: theme.palette.text.primary
            }}
          >
            {job.name}
          </Typography>
        </CardContent>
        
        {BranchJobData[job.name]?.jobs && BranchJobData[job.name].jobs?.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              padding: '2px',
              backgroundColor: theme.palette.background.default,
            }}
          >
            {getFilteredBranches().map((branchJob, index) => (
              <BranchItem key={index} job={branchJob} />
            ))}
          </Box>
        )}
      </Card>
    </Fade>
  );
};

export default RepositoryItem;