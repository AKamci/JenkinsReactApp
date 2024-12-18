import { Dispatch} from 'react';
import {addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { JobDto } from '../../infrastructure/dtos/JobDto';


export const handleCheckbox = (
  job: JobDto,
  isChecked: boolean,
  setCheckedJobs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  dispatch: Dispatch<any>
) => {
  setCheckedJobs((prevState) => {
    const newState = {
      ...prevState,
      [job.name]: isChecked,
    };

    console.log(`Checkbox değişti: ${job.name} - ${isChecked ? 'Seçildi' : 'Seçilmedi'}`);
    console.log('Güncellenmiş kontrol durumu:', newState);

    if (isChecked) {
      dispatch(addSelectedProject(job));
    } else {
      dispatch(removeSelectedProject(job.name));
    }
    
    return newState;
  });
};