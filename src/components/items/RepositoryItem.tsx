import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, Typography, Fade, Grid, Chip, styled, IconButton, Tooltip } from '@mui/material';
import { AccountTree } from '@mui/icons-material';
import BranchItem from './BranchItem';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  gap: theme.spacing(1),
}));


const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchJobData = () => {
      dispatch(GetBranchJob({
        jobName: parent,
        jobName2: job.name,
        apiSettings,
      }));
    };

    fetchJobData();
    intervalId = setInterval(fetchJobData, 10000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, job.name, parent, apiSettings]);


  const hasData = BranchJobData[job.name]?.jobs?.length > 0;

  return (
    <Fade in={true} timeout={300}>
      <Box sx={{ margin: '8px', position: 'relative' }}>
        <StyledCard
          variant="outlined"
          sx={{
            borderColor: job.color,
            borderWidth: '1px',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column' // Ensures vertical layout
          }}
        >
          <StyledCardContent> {/* Main Row for Repo Name and Icon */}
            <AccountTree sx={{ fontSize: '1.1rem' }} color="primary" />
            <Typography variant="subtitle1" sx={{ fontSize: '0.85rem', fontWeight: 500, flexGrow: 1 }}>
              {job.name}
            </Typography>
          </StyledCardContent>
          {hasData && ( /* Branch Items Row (only if data exists) */
             <Box sx={{ display: 'flex', gap: 1, padding: '0 8px', flexWrap: 'wrap' }}> {/* Allow wrapping if necessary */}
               {BranchJobData[job.name]?.jobs?.map((branchJob, index) => (
                 <BranchItem key={index} job={branchJob} />
               ))}
             </Box>
          )}

        </StyledCard>
      </Box>
    </Fade>
  );
};

export default RepositoryItem;