import { Dispatch, SetStateAction } from 'react';
import { setSelectedProjects } from '../../infrastructure/store/slices/File/Projects-Slice';
import { MockDataGetAll } from '../../infrastructure/MockData/MockDataGetAll';

type HandleCheckboxChange = (
  groupName: string,
  checked: boolean,
  checkedStates: { [key: string]: boolean },
  setCheckedStates: Dispatch<SetStateAction<{ [key: string]: boolean }>>,
  dispatch: any 
) => void;

export const handleCheckboxChange: HandleCheckboxChange = (groupName, checked, checkedStates, setCheckedStates, dispatch) => {
  setCheckedStates((prev) => ({
    ...prev,
    [groupName]: checked,
  }));

  if (checked) {
    const projects = MockDataGetAll.jobs.filter((job) => job.name.startsWith(groupName));
    dispatch(setSelectedProjects(projects));
  } else {
    dispatch(setSelectedProjects([]));
  }
};