import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import JobItem from '../jobItem/JobItem'; 
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetRepositoryJob } from '../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';

interface GroupCardProps {
  groupName: string;
  jobs: JobDto[];
}


const GroupCard: React.FC<GroupCardProps> = ({ groupName, jobs }) => {
  const dispatch = useDispatch<AppDispatch>();
	const getRepositoryJobData = useAppSelector((state) => state.getRepositoryJob.data);
  console.log(groupName,jobs, "groupName,jobs")


  useEffect(() => {
    dispatch(GetRepositoryJob({jobName: groupName})); 
}, [dispatch, groupName]);

  const handleRemoveGroup = () => {
    dispatch(removeSelectedProject(groupName));
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
          <JobItem key={job.name} job={job} />
        ))}
      </Box>
    </Container>
  );
};

export default GroupCard;
