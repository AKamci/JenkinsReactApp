import { Dispatch, SetStateAction } from 'react';
import { setSelectedProjects, addSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { MockDataGetAll } from '../../infrastructure/MockData/MockDataGetAll';

type HandleCheckboxChange = (
  groupName: string,
  checked: boolean,
  checkedStates: { [key: string]: boolean },
  setCheckedStates: Dispatch<SetStateAction<{ [key: string]: boolean }>>,
  dispatch: any 
) => void;

export const handleCheckboxChange: HandleCheckboxChange = (groupName, checked, checkedStates, setCheckedStates, dispatch) => {
    const updatedCheckedStates = {
      ...checkedStates,
      [groupName]: checked,
    };
    const selectedGroups = Object.keys(updatedCheckedStates).filter(group => updatedCheckedStates[group]);
  
    const selectedProjects = MockDataGetAll.jobs.filter((job) => {
      const currentGroup = job.name.split('_')[0];
      return selectedGroups.includes(currentGroup);
    });
  
    dispatch(setSelectedProjects(selectedProjects));
  
    setCheckedStates(updatedCheckedStates);
  
    console.log(selectedProjects);
  };