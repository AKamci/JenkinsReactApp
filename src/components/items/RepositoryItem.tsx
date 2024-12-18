import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, Typography, Fade, styled } from '@mui/material';
import { AccountTree } from '@mui/icons-material';
import BranchItem from './BranchItem/BranchItem';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';
import { darkTheme, lightTheme } from '../../theme/theme';

const StyledCard = styled(Card)<{isDarkMode?:boolean}>(({isDarkMode}) => ({ 
  margin: '2px',
  borderRadius: '8px', 
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  transition: 'all 0.2s ease',
  border: '1px solid rgba(0,0,0,0.04)',
  background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
}));

const StyledCardContent = styled(CardContent)<{isDarkMode?:boolean}>(({isDarkMode}) => ({ 
  display: 'flex',
  alignItems: 'center',
  color: 'grey',
  padding: '0px 12px',
  gap: '8px',
  borderBottom: '1px solid rgba(0,0,0,0.03)',
  backgroundColor: 'rgba(0,0,0,0.01)',
  background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,

}));

const BranchContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  padding: '2px',
});

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);


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

  return (
    <Fade in={true} timeout={300}>
      <StyledCard isDarkMode={isDarkMode}>
        <StyledCardContent isDarkMode={isDarkMode}>
          <AccountTree sx={{fontSize: '1rem', color: job.color || '#9c27b0', opacity: 0.7}} />
          <Typography sx={{fontSize: '0.85rem', fontWeight: 500, opacity: 0.3}}>{job.name}</Typography>
        </StyledCardContent>
        
        {BranchJobData[job.name]?.jobs?.length > 0 && (
          <BranchContainer>
            {BranchJobData[job.name].jobs.map((branchJob, index) => (
              <BranchItem key={index} job={branchJob} />
            ))}
          </BranchContainer>
        )}
      </StyledCard>
    </Fade>
  );
};

export default RepositoryItem;