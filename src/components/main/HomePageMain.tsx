import React from 'react';
import { useAppSelector } from '../../infrastructure/store/store';
import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';
import JobItem from '../jobItem/JobItem'; 
import { JobDto } from '../../infrastructure/dtos/JobDto';

const HomePageMain = () => {
    const selectedProjects: Project[] = useAppSelector((state) => state.getProjectName.selectedProjects);

    return (
        <Container>
            {selectedProjects.length > 0 ? (
                <List>
                    {selectedProjects.map((project) => (
                        <React.Fragment key={project.name}>
                            <ListItem divider>
                                <ListItemText primary={project.name} />
                            </ListItem>
                            {project.jobs && project.jobs.length > 0 && (
                                <List>
                                    {project.jobs.map((job: JobDto) => (
                                        <ListItem key={job.name}>
                                            <JobItem job={job} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography variant="h6" color="textSecondary">
                    Seçili grup için proje bulunamadı.
                </Typography>
            )}
        </Container>
    );
};

export default HomePageMain;