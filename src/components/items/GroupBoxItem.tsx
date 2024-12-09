import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import RepositoryItem from './RepositoryItem'; 
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetRepositoryJob } from '../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';

interface GroupCardProps {
  groupName: string;
}

const GroupBoxItem: React.FC<GroupCardProps> = ({ groupName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const getRepositoryJobData = useAppSelector(
    (state) => state.getRepositoryJob[groupName]?.jobs
  );
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  useEffect(() => {
    const fetchJobData = () => {
      dispatch(GetRepositoryJob({ jobName: groupName, groupName, apiSettings }));
      console.log(getRepositoryJobData, "getRepositoryJobData");
    };

    fetchJobData(); 
    const intervalId = setInterval(fetchJobData, 10000);

    return () => clearInterval(intervalId); 

  }, [dispatch, groupName, apiSettings]); 

  const handleRemoveGroup = () => {
    dispatch(removeSelectedProject(groupName));
    console.log(getRepositoryJobData, "getRepositoryJobData");
  };

  return (
    <Container
      style={{
        margin: '20px auto',
        padding: '24px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        backgroundColor: '#fff',
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="div"
          style={{ marginBottom: '16px', color: '#3f51b5' }}
        >
          <Button onClick={handleRemoveGroup}>{groupName}</Button>
        </Typography>
        {getRepositoryJobData?.jobs?.map((job) => (
          <RepositoryItem key={job.name} job={job} parent={groupName}/>
        ))}
      </Box>
    </Container>
  );
};

export default GroupBoxItem;