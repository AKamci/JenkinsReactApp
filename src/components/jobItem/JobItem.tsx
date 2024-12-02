import { JobDto } from '../../infrastructure/dtos/JobDto';
import * as React from 'react';
import { Button, Box } from '@mui/material';


const JobItem: React.FC<{ job: JobDto }> = ({ job }) => {
  return (
    <Box style={{ margin: '10px' }}>
      <Button
        variant="outlined"
        style={{
          borderColor: job.color,
          color: 'black',
          backgroundColor: 'white',
          borderWidth: '2px', 
        }}
        onClick={() => window.open(job.url, '_blank')}
      >
        {job.name}
      </Button>
    </Box>
  );
}

export default JobItem;