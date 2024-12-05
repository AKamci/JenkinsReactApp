import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { MockDataGetAll } from '../../infrastructure/MockData/MockDataGetAll';

import axios from 'axios';
import GroupItem from '../groupItem/GroupItem';
import { setSelectedProjects } from '../../infrastructure/store/slices/File/Projects-Slice';
import { handleCheckbox } from '../func/handleCheckBoxChance';
import { getAllJob } from '../../infrastructure/store/slices/Job/GetAllJob-Slice';

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
	  <div>
		{allJobWithName && allJobWithName.jobs && allJobWithName.jobs.map((job: JobDto) => (
		  <GroupItem
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