import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import GroupCard from '../groupItem/GroupCard';
import { JobDto } from '../../infrastructure/dtos/JobDto';

const HomePageMain = () => {

    //İlgili Dosyaların tüm repositorylerini çek.

    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    console.log(selectedProjects, "selectedProjects")


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {selectedProjects.map((job) => (
            <GroupCard key={job.name} groupName={job.name} jobs={[job]} />
        ))}
    </div>
    );
};

export default HomePageMain;