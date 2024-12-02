import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import GroupCard from '../groupItem/GroupCard';
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
                <GroupCard key={groupName} groupName={groupName} jobs={jobs} />
            ))}
        </div>
    );
};

export default HomePageMain;