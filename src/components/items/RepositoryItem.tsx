import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, Typography, Fade, useTheme } from '@mui/material';
import { AccountTree } from '@mui/icons-material';
import BranchItem from './BranchItem/BranchItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';
import { darkTheme, lightTheme } from '../../theme/theme';

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
  const featureCount = useSelector((state: RootState) => state.getFeatureCount.count);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

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

  const getFilteredBranches = () => {
    if (!BranchJobData[job.name]?.jobs) return [];

    const allBranches = BranchJobData[job.name].jobs;
    const featureBranches = allBranches
      .filter(branch => branch.name.toLowerCase().startsWith('feature') && branch.lastBuild)
      .sort((a, b) => (b.lastBuild?.timestamp || 0) - (a.lastBuild?.timestamp || 0))
      .slice(0, featureCount);

    const otherBranches = allBranches.filter(branch => !branch.name.toLowerCase().startsWith('feature'));

    return [...featureBranches, ...otherBranches];
  };

  return (
    <Fade in={true} timeout={300}>
      <Card
        sx={{
          margin: '2px',
          borderRadius: '8px',
          backgroundColor: currentTheme.palette.background.paper,
          boxShadow: currentTheme.shadows[1],
          transition: 'all 0.2s ease',
          border: `1px solid ${currentTheme.palette.divider}`,
          '&:hover': {
            boxShadow: currentTheme.shadows[3],
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: currentTheme.palette.text.secondary,
            padding: '0px 12px',
            gap: '8px',
            borderBottom: `1px solid ${currentTheme.palette.divider}`,
            backgroundColor: isDarkMode ? 
              currentTheme.palette.background.default : 
              currentTheme.palette.action.hover,
          }}
        >
          <AccountTree 
            sx={{
              fontSize: '1rem',
              color: job.color || currentTheme.palette.secondary.main,
              opacity: isDarkMode ? 0.9 : 0.7
            }}
          />
          <Typography 
            sx={{
              fontSize: '0.85rem',
              fontWeight: 500,
              opacity: isDarkMode ? 0.7 : 0.3,
              color: currentTheme.palette.text.primary
            }}
          >
            {job.name}
          </Typography>
        </CardContent>
        
        {BranchJobData[job.name]?.jobs?.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              padding: '2px',
              backgroundColor: currentTheme.palette.background.default,
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