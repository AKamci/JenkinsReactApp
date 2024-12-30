import React, { useEffect, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../infrastructure/store/store';
import { JobDto } from '../../../../infrastructure/dtos/JobDto';
import { handleCheckbox } from '../../../func/handleCheckBoxChance';
import { getAllJob } from '../../../../infrastructure/store/slices/Job/GetAllJob-Slice';
import OrganizationFolderItem from '../../../items/OrganizationFolderItem';
import Grid from '@mui/material/Grid2';

interface HomePageLeftNavProps {
    checkedJobs: Record<string, boolean>;
    setCheckedJobs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const HomePageLeftNav: React.FC<HomePageLeftNavProps> = React.memo(({ checkedJobs, setCheckedJobs }) => {
    const dispatch = useAppDispatch();
    const allJobWithName = useAppSelector((state) => state.getAllJob.data);
    
    const folderNames = useMemo(() => {
        return import.meta.env.VITE_FOLDER_NAME?.split(',')
            .map((name: string) => name.trim().toLowerCase()) || [];
    }, []);

    useEffect(() => {
        const fetchJobs = () => {
            dispatch(getAllJob());
        };
        fetchJobs();
        const intervalId = setInterval(fetchJobs, 30000);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleJobChange = useCallback((job: JobDto, isChecked: boolean) => {
        handleCheckbox(job, isChecked, setCheckedJobs, dispatch);
    }, [dispatch, setCheckedJobs]);

    const filteredJobs = useMemo(() => {
        return allJobWithName?.jobs?.filter((job: JobDto) => 
            !folderNames.includes(job.name.toLowerCase())
        ) || [];
    }, [allJobWithName?.jobs, folderNames]);

    return (
        <Grid container spacing={0} justifyContent="flex-start">
            {filteredJobs.map((job: JobDto) => (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={job.name}>
                    <OrganizationFolderItem
                        key={job.name}
                        label={job.name} 
                        checked={!!checkedJobs[job.name]}
                        onChange={(isChecked) => handleJobChange(job, isChecked)}
                    />
                </Grid>
            ))}
        </Grid>
    );
});

HomePageLeftNav.displayName = 'HomePageLeftNav';

export default HomePageLeftNav;