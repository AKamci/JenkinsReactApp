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
  padding: '16px !important',
  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  borderRadius: '8px'
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: '0 4px',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)'
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

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleLinkClick = () => {
    window.open(`http://jenkins/${parent}/job/${job.name}`, '_blank');
  };

  const getStatusCounts = () => {
    const jobs = BranchJobData[job.name]?.jobs || [];
    const redCount = jobs.filter(j => j.color === 'red').length;
    const blueCount = jobs.filter(j => j.color === 'blue').length;
    return { redCount, blueCount };
  };

  const { redCount, blueCount } = getStatusCounts();
  const hasData = BranchJobData[job.name]?.jobs?.length > 0;

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ margin: '12px', position: 'relative' }}>
        <StyledCard
          variant="outlined"
          sx={{
            borderColor: job.color,
            borderWidth: '2px',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <StyledCardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {expanded ? <AccountTree color="primary" /> : <AccountTreeOutlined color="primary" />}
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  fontSize: '1.1rem'
                }}
              >
                {job.name}
              </Typography>
              {hasData && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StyledChip
                      icon={<CheckCircle fontSize="small" />}
                      label={blueCount}
                      size="small"
                      variant="outlined"
                      className="blue"
                    />
                    <Typography sx={{ color: 'text.secondary', mx: 0.5 }}>/</Typography>
                    <StyledChip
                      icon={<Cancel fontSize="small" />}
                      label={redCount}
                      size="small"
                      variant="outlined"
                      className="red"
                    />
                  </Box>
                </Box>
              )}
              <IconButton
                onClick={handleLinkClick}
                size="small"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <LinkOutlined fontSize="small" />
              </IconButton>
            </Box>
            <IconButton 
              onClick={handleExpandClick}
              sx={{
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ExpandMore />
            </IconButton>
          </StyledCardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ 
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.02)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}>
              <Grid container spacing={2}>
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