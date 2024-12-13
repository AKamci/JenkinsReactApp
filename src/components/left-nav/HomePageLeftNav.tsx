import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { handleCheckbox } from '../func/handleCheckBoxChance';
import { getAllJob } from '../../infrastructure/store/slices/Job/GetAllJob-Slice';
import OrganizationFolderItem from '../items/OrganizationFolderItem';

const HomePageLeftNav: React.FC = () => {
    const dispatch = useAppDispatch();
    const allJobWithName = useAppSelector((state) => state.getAllJob.data);
    const [checkedJobs, setCheckedJobs] = useState<Record<string, boolean>>({});
  
    useEffect(() => {
        dispatch(getAllJob());
    }, [dispatch]);
  
    return (
        <div>
            {allJobWithName?.jobs?.map((job: JobDto) => (
                <OrganizationFolderItem
                    key={job.name}
                    label={job.name} 
                    checked={!!checkedJobs[job.name]}
                    onChange={(isChecked) => handleCheckbox(job, isChecked, setCheckedJobs, dispatch)}
                />
            ))}
        </div>
    );
};

export default HomePageLeftNav;