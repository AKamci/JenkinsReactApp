import { useAppDispatch, useAppSelector } from '../../../../infrastructure/store/store';
import GroupBoxItem from '../../../items/GroupBoxItem/GroupBoxItem';
import { JobDto } from '../../../../infrastructure/dtos/JobDto';
import { Box } from '@mui/material';
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
                    width: `${100 / Math.min(itemsPerRow, 8)}%`,
                    padding: spacing / 2,
                    display: 'inline-block',
                    verticalAlign: 'top'
                }}
            >
                <GroupBoxItem groupName={job.name} />
            </Box>
        ));
    }, [selectedProjects, itemsPerRow, spacing]);

    return (
        <>
            <SearchedItemBox />
            <Box 
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: 0,
                    width: '100%',
                    padding: 1
                }}
            >
                {gridItems}
            </Box>
        </>
    );
};

export default HomePageMain;