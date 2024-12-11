import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, IconButton, Typography, Collapse, Fade, Grid } from '@mui/material';
import { ExpandMore, AccountTree, AccountTreeOutlined, LinkOutlined } from '@mui/icons-material';
import BranchItem from './BranchItem';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';
import { styled } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4]
  }
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px !important',
  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  borderRadius: '4px'
}));

const StatusDot = styled('span')<{ status: 'success' | 'error' }>(({ status }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: status === 'success' ? blue[500] : red[500],
  marginRight: '4px'
}));

const StatusBadge = styled('div')<{ status: 'success' | 'error' }>(({ status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '3px 8px',
  borderRadius: '12px',
  fontSize: '0.65rem',
  backgroundColor: status === 'success' ? blue[50] : red[50],
  color: status === 'success' ? blue[700] : red[700],
  margin: '0 3px',
  minWidth: '24px',
  justifyContent: 'center'
}));

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchJobData = () => {
      dispatch(GetBranchJob({
        jobName: parent,
        jobName2: job.name,
        apiSettings
      }));
    };

    if (expanded) {
      fetchJobData();
      intervalId = setInterval(fetchJobData, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [dispatch, job.name, parent, expanded, apiSettings]);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleLinkClick = () => window.open(`${job.url}`, '_blank');

  const getStatusCounts = () => {
    const jobs = BranchJobData[job.name]?.jobs || [];
    return {
      redCount: jobs.filter(j => j.color === 'red').length,
      blueCount: jobs.filter(j => j.color === 'blue').length
    };
  };

  const { redCount, blueCount } = getStatusCounts();
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
            position: 'relative'
          }}
        >
          <StyledCardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {expanded ? <AccountTree sx={{fontSize: '1.1rem'}} color="primary" /> : <AccountTreeOutlined sx={{fontSize: '1.1rem'}} color="primary" />}
              <Typography variant="subtitle1" sx={{fontSize: '0.7rem', fontWeight: 500}}>
                {job.name}
              </Typography>
              {hasData && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {blueCount > 0 && (
                    <StatusBadge status="success">
                      <StatusDot status="success" />
                      {blueCount}
                    </StatusBadge>
                  )}
                  {redCount > 0 && (
                    <StatusBadge status="error">
                      <StatusDot status="error" />
                      {redCount}
                    </StatusBadge>
                  )}
                </Box>
              )}
              <IconButton onClick={handleLinkClick} size="small" sx={{padding: '2px'}}>
                <LinkOutlined sx={{fontSize: '0.9rem'}} />
              </IconButton>
            </Box>
            <IconButton 
              onClick={handleExpandClick}
              size="small"
              sx={{
                padding: '2px',
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <ExpandMore sx={{fontSize: '1.1rem'}} />
            </IconButton>
          </StyledCardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{padding: '8px', background: 'rgba(0, 0, 0, 0.02)'}}>
              <Grid container spacing={1}>
                {BranchJobData[job.name]?.jobs?.map((branchJob, index) => (
                  <Grid item xs={6} key={index}>
                    <BranchItem job={branchJob} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </StyledCard>
      </Box>
    </Fade>
  );
};

export default RepositoryItem;