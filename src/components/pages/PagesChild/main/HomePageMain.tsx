import { useAppDispatch, useAppSelector } from '../../../../infrastructure/store/store';
import GroupBoxItem from '../../../items/GroupBoxItem/GroupBoxItem';
import { JobDto } from '../../../../infrastructure/dtos/JobDto';
import { Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import SearchedItemBox from '../../../SearchBar/SearchedItemBox';
import { getLastBuildsForInformation } from '../../../../infrastructure/store/slices/Information/GetLastBuildsForInformation-Slice';
import { getQueueItems } from '../../../../infrastructure/store/slices/Information/GetInQueueItem-Slice';
import { useEffect, useCallback, useMemo } from 'react';

const HomePageMain = () => {
    const dispatch = useAppDispatch();
    const selectedProjects: JobDto[] = useAppSelector((state) => state.getProjectName.selectedProjects);
    const { itemsPerRow, spacing } = useAppSelector((state) => state.gridLayout);

    const fetchData = useCallback(() => {
        dispatch(getQueueItems());
        dispatch(getLastBuildsForInformation());
    }, [dispatch]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const gridItems = useMemo(() => {
        return selectedProjects.map((job) => (
            <Box 
                key={job.name}
                sx={{
                    width: '100%',
                    padding: spacing / 2
                }}
            >
                <GroupBoxItem groupName={job.name} />
            </Box>
        ));
    }, [selectedProjects, spacing]);

    return (
        <>
            <SearchedItemBox />
            <Box sx={{ padding: 1 }}>
                <Masonry
                    columns={Math.min(itemsPerRow, 8)}
                    spacing={spacing}
                    sx={{
                        width: '100%',
                        margin: 0
                    }}
                >
                    {gridItems}
                </Masonry>
            </Box>
        </>
    );
};

export default HomePageMain;