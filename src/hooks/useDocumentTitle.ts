import { useEffect } from 'react';
import { useAppSelector } from '../infrastructure/store/store';

export const useDocumentTitle = () => {
  const buildingJobs = useAppSelector((state) => state.getStartedBuildNotificationForTittle.buildingJobs);

  useEffect(() => {
    const baseTitle = 'Jenkins Dashboard';
    document.title = buildingJobs.length > 0 
      ? `${baseTitle} (${buildingJobs.length})`
      : baseTitle;
  }, [buildingJobs]);
}; 