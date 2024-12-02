import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';
import JobItem from '../jobItem/JobItem'; 
import { JobDto } from '../../infrastructure/dtos/JobDto';

const HomePageMain = () => {
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
  
    const groupedProjects = selectedProjects.reduce((groups, job) => {
      const group = job.name.split('_')[0];
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(job);
      return groups;
    }, {} as Record<string, JobDto[]>);
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {Object.entries(groupedProjects).map(([groupName, jobs]) => (
          <div key={groupName} style={{ margin: '0 10px' }}>
            <h3>{groupName}</h3>
            {jobs.map((job) => (
              <JobItem key={job.name} job={job} />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default HomePageMain;