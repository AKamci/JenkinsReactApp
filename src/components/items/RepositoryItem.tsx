import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, IconButton, Typography, Collapse, Fade, Chip, Grid } from '@mui/material';
import { ExpandMore, AccountTree, AccountTreeOutlined, LinkOutlined, CheckCircle, Cancel } from '@mui/icons-material';
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

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: '0 2px',
  transition: 'all 0.2s ease',
  height: '24px',
  '& .MuiChip-label': {
    fontSize: '0.6rem',
    padding: '0 6px'
  },
  '&.red': {
    backgroundColor: red[50],
    color: red[700],
    borderColor: red[200]
  },
  '&.blue': {
    backgroundColor: blue[50],
    color: blue[700],
    borderColor: blue[200]
  }
}));

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

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
                  <StyledChip
                    icon={<CheckCircle sx={{fontSize: '0.9rem'}} />}
                    label={blueCount}
                    size="small"
                    variant="outlined"
                    className="blue"
                  />
                  <StyledChip
                    icon={<Cancel sx={{fontSize: '0.9rem'}} />}
                    label={redCount}
                    size="small"
                    variant="outlined"
                    className="red"
                  />
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