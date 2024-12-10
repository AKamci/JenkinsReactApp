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
	  const fetchData = async () => {
		await dispatch(getAllJob());
	  };
	  fetchData();
	}, [dispatch]);
  
	return (
		<div style={{
			paddingLeft: 0,
			position: 'relative'
		}}>
			<div style={{
				position: 'absolute',
				right: 0,
				top: 0,
				bottom: 0,
				width: '2px',
				background: 'rgba(0,0,0,0.1)'
			}} />
			{allJobWithName && allJobWithName.jobs && allJobWithName.jobs.map((job: JobDto) => (
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