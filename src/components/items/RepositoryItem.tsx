import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import BranchItem from './BranchItem';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { useEffect } from 'react';
import { GetBranchJob } from '../../infrastructure/store/slices/Job/GetBranchJob-Slice';

const RepositoryItem: React.FC<{ job: JobDto; parent: string }> = ({ job, parent }) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const BranchJobData = useAppSelector((state) => state.getBranchJob.data);
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  console.log(job.name, "job.name");
  console.log(parent, "parent");

  useEffect(() => {
    if (expanded && !BranchJobData[job.name]) {
      const fetchJobData = () => {
        dispatch(GetBranchJob({
          jobName: parent,
          jobName2: job.name,
          apiSettings
        }));
      };

      fetchJobData(); 
      const intervalId = setInterval(fetchJobData, 10000); 

      return () => clearInterval(intervalId); 
    }
  }, [dispatch, job.name, parent, expanded, BranchJobData, apiSettings]); 

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box style={{ margin: '10px' }}>
      <Card
        variant="outlined"
        style={{
          borderColor: job.color,
          borderWidth: '2px',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" style={{ color: 'black' }}>
            {job.name}
          </Typography>
          <IconButton onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardContent>
        {expanded && (
          <Box style={{ padding: '10px' }}>
            {BranchJobData[job.name]?.jobs?.map((branchJob, index) => (
              <BranchItem key={index} job={branchJob} />
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default RepositoryItem;