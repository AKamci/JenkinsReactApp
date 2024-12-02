import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import JobItem from '../jobItem/JobItem'; 
import { JobDto } from '../../infrastructure/dtos/JobDto';

interface GroupCardProps {
  groupName: string;
  jobs: JobDto[];
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, jobs }) => (
  <Card style={{ margin: '10px' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {groupName}
      </Typography>
      {jobs.map((job) => (
        <JobItem key={job.name} job={job} />
      ))}
    </CardContent>
  </Card>
);

export default GroupCard;