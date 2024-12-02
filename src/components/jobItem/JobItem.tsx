import React from 'react';
import { JobDto } from '../../infrastructure/dtos/JobDto';

const JobItem: React.FC<{ job: JobDto }> = ({ job }) => {
  return (
    <div>
      <h4>{job.name}</h4>
      {job.name && <p>{job.color}</p>}
    </div>
  );
}

export default JobItem;