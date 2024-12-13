import { useAppSelector } from '../../infrastructure/store/store';
import GroupBoxItem from '../items/GroupBoxItem';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import Grid from '@mui/material/Grid2';


const HomePageMain = () => {
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);

    return (
        <Grid container spacing={0} justifyContent="flex-start">
            {selectedProjects.map((job) => (
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }} key={job.name}>
                    <GroupBoxItem groupName={job.name} />
                </Grid>
            ))}
        </Grid>
    );
};

export default HomePageMain;