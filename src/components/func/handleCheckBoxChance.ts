import { Dispatch, SetStateAction } from 'react';
import { setSelectedProjects, addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { MockDataGetAll } from '../../infrastructure/MockData/MockDataGetAll';
import { JobDto } from '../../infrastructure/dtos/JobDto';

type HandleCheckboxChange = (
  groupName: string,
  checked: boolean,
  checkedStates: { [key: string]: boolean },
  setCheckedStates: Dispatch<SetStateAction<{ [key: string]: boolean }>>,
  dispatch: any 
) => void;

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

    // Konsola yazdırma işlemi
    console.log(`Checkbox değişti: ${job.name} - ${isChecked ? 'Seçildi' : 'Seçilmedi'}`);
    console.log('Güncellenmiş kontrol durumu:', newState);

    // Projeye göre ekleme ya da çıkarma işlemi
    if (isChecked) {
      dispatch(addSelectedProject(job));
    } else {
      dispatch(removeSelectedProject(job.name));
    }

    return newState;
  });
};