import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import { getAllJob } from '../../infrastructure/store/slices/Job/GetAllJob-Slice';
import { MockDataGetAll } from '../../infrastructure/MockData/MockDataGetAll';

import axios from 'axios';
import GroupItem from '../groupItem/GroupItem';
import { setSelectedProjects } from '../../infrastructure/store/slices/File/Projects-Slice';
import { handleCheckboxChange } from '../func/handleCheckBoxChance';

const HomePageLeftNav = () => {
  const dispatch = useAppDispatch();
	const getAllJobData = useAppSelector((state) => state.getAllJob.data);

	const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>(
		MockDataGetAll.jobs.reduce((acc, job) => {
			const groupName = job.name.split('_')[0];
			acc[groupName] = false;
			return acc;
		}, {} as { [key: string]: boolean }),
	);




	return (
		<div>
			{Object.keys(checkedStates).map((groupName) => (
				<GroupItem
					key={groupName}
					label={groupName}
					checked={checkedStates[groupName]}
					onChange={(checked) => handleCheckboxChange(groupName, checked, checkedStates, setCheckedStates, dispatch)}
				/>
			))}
		</div>
	);
};

export default HomePageLeftNav;
