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
  const updateStateAndCookies = () => {
    try {
      const savedProjects = Cookies.get('selectedProjects');
      const currentProjects = savedProjects ? JSON.parse(savedProjects) : [];
      
      const updatedProjects = isChecked 
        ? [...currentProjects, job]
        : currentProjects.filter((project: JobDto) => project.name !== job.name);
      
      Cookies.set('selectedProjects', JSON.stringify(updatedProjects), { expires: 30 });
      
      if (isChecked) {
        dispatch(addSelectedProject(job));
      } else {
        dispatch(removeSelectedProject(job.name));
      }
      
    } catch (error) {
      console.error('Cookie işlemi sırasında hata:', error);
    }
  };

  setCheckedJobs((prevState) => {
    const newState = {
      ...prevState,
      [job.name]: isChecked,
    };
    setTimeout(updateStateAndCookies, 0);

    return newState;
  });
};