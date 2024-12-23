import { Dispatch } from 'react';
import { addSelectedProject, removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import Cookies from 'js-cookie';

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
    
    try {
      const savedProjects = Cookies.get('selectedProjects');
      const currentProjects = savedProjects ? JSON.parse(savedProjects) : [];
      
      if (isChecked) {
        const updatedProjects = [...currentProjects, job];
        Cookies.set('selectedProjects', JSON.stringify(updatedProjects), { expires: 30 });
      } else {
        const updatedProjects = currentProjects.filter((project: JobDto) => project.name !== job.name);
        Cookies.set('selectedProjects', JSON.stringify(updatedProjects), { expires: 30 });
      }
    } catch (error) {
      console.error('Cookie işlemi sırasında hata:', error);
    }
    
    return newState;
  });
};