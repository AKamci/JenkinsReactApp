import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { handleCheckbox } from '../func/handleCheckBoxChance';
import { getAllJob } from '../../infrastructure/store/slices/Job/GetAllJob-Slice';
import OrganizationFolderItem from '../items/OrganizationFolderItem';

interface HomePageLeftNavProps {
    checkedJobs: Record<string, boolean>;
    setCheckedJobs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const HomePageLeftNav: React.FC<HomePageLeftNavProps> = ({ checkedJobs, setCheckedJobs }) => {
    const dispatch = useAppDispatch();
    const allJobWithName = useAppSelector((state) => state.getAllJob.data);
  
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