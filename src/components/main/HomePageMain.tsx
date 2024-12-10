import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import GroupBoxItem from '../items/GroupBoxItem';
import { JobDto } from '../../infrastructure/dtos/JobDto';

const HomePageMain = () => {

    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    console.log(selectedProjects, "selectedProjects")

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {selectedProjects.map((job) => (
            <GroupBoxItem key={job.name} groupName={job.name}/>
        ))}
    </div>
    );
};


export default HomePageMain;