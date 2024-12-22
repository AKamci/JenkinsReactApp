import { useAppSelector } from '../../../../infrastructure/store/store';
import GroupBoxItem from '../../../items/GroupBoxItem/GroupBoxItem';
import { JobDto } from '../../../../infrastructure/dtos/JobDto';
import Grid from '@mui/material/Grid2';
import { darkTheme, lightTheme } from '../../../../theme/theme';
import SearchedItemBox from '../../../SearchBar/SearchedItemBox';

const HomePageMain = () => {
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);

    return (
        <>
            <SearchedItemBox />
            <Grid container spacing={0} justifyContent="flex-start" sx={{ 
                background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
            }}>
                {selectedProjects.map((job) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }} key={job.name}>
                        <GroupBoxItem groupName={job.name}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default HomePageMain;