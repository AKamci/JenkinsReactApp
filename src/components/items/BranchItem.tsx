import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../infrastructure/store/store';

type BranchJobItemProps = {
  job: JobDto; // `data` yerine `job` ve türü JobDto
};

const BranchItem: React.FC<BranchJobItemProps> = ({ job }) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log(job, "JOB IN BRANCH");


  return (
    <Card variant="outlined" style={{ margin: '5px', padding: '10px' }}>
      <CardContent>
        <Typography variant="body1">
          {job.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BranchItem;
