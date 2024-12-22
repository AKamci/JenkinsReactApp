import React, { useEffect } from 'react'
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

const HomePageLeftNav: React.FC<HomePageLeftNavProps> = ({ checkedJobs, setCheckedJobs }) => {
    const dispatch = useAppDispatch();
    const allJobWithName = useAppSelector((state) => state.getAllJob.data);
    const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
    const folderNames = import.meta.env.VITE_FOLDER_NAME?.split(',').map((name: string) => name.trim().toLowerCase()) || [];
    console.log(folderNames, 'folderNames');

    useEffect(() => {
        dispatch(getAllJob());
    }, [dispatch]);
  
    return (
        <Grid container spacing={0} justifyContent="flex-start" sx={{ 
        }}>
            {allJobWithName?.jobs?.filter((job: JobDto) => !folderNames.includes(job.name.toLowerCase())).map((job: JobDto) => (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={job.name}>
                    <OrganizationFolderItem
                    key={job.name}
                    label={job.name} 
                    checked={!!checkedJobs[job.name]}
                    onChange={(isChecked) => handleCheckbox(job, isChecked, setCheckedJobs, dispatch)}
                />
                </Grid>
            ))}
        </Grid>
    );
};
export default HomePageLeftNav;