import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import GroupBoxItem from '../items/GroupBoxItem';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { Box } from '@mui/material';

const HomePageMain = () => {
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    console.log(selectedProjects, "selectedProjects")

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            '& > *': {
                width: '100%',
                transition: 'width 0.3s ease',
                '&:hover': {
                    width: '100%'
                }
            }
        }}>
            {selectedProjects.map((job) => (
                <GroupBoxItem key={job.name} groupName={job.name}/>
            ))}
        </Box>
    );
};

export default HomePageMain;