import { useAppDispatch, useAppSelector } from '../../../../infrastructure/store/store';
import GroupBoxItem from '../../../items/GroupBoxItem/GroupBoxItem';
import { JobDto } from '../../../../infrastructure/dtos/JobDto';
import Grid from '@mui/material/Grid2';
import SearchedItemBox from '../../../SearchBar/SearchedItemBox';
import { getLastBuildsForInformation } from '../../../../infrastructure/store/slices/Information/GetLastBuildsForInformation-Slice';
import { getQueueItems } from '../../../../infrastructure/store/slices/Information/GetInQueueItem-Slice';
import { useEffect } from 'react';

const HomePageMain = () => {
    const dispatch = useAppDispatch();
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);

    useEffect(() => {
        const fetchData = () => {
            console.log("fetchData");
            dispatch(getQueueItems());
            dispatch(getLastBuildsForInformation());
        };
        fetchData(); 
        const interval = setInterval(fetchData, 10000); 
        return () => clearInterval(interval); 
    }, [dispatch]);

    return (
        <>
            <SearchedItemBox />
            <Grid container spacing={0} justifyContent="flex-start" sx={{ 
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