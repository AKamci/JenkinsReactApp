import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { getAllBuildingJobs } from '../../infrastructure/store/slices/Information/GetAllBuildingJobs-Slice';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItemButton, ListItemText, alpha, Badge } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JobDto } from '../../infrastructure/dtos/JobDto';

const BuildingJobInformation = () => {
    const buildingJobs = useAppSelector(state => state.getAllBuildingJobs.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchBuildingJobs = () => {
            dispatch(getAllBuildingJobs());
        };

        fetchBuildingJobs();
        const intervalId = setInterval(fetchBuildingJobs, 10000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const buildingJobsList = buildingJobs?.jobs?.flatMap((folder: JobDto) =>
        folder.jobs?.flatMap((project: JobDto) =>
            project.jobs?.filter((job: JobDto) =>
                job?.lastBuild?.building === true
            ) || []
        ) || []
    ) || [];

    return (
        <Accordion sx={{ 
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': {
                display: 'none',
            }
        }}>
           <AccordionSummary
               expandIcon={<ExpandMoreIcon sx={{ color: '#1a73e8' }} />}
               sx={{
                   padding: 0,
                   minHeight: 'unset',
                   '& .MuiAccordionSummary-content': {
                       margin: 0
                   }
               }}
           >
               <Typography
                   variant="subtitle1"
                   sx={{
                       fontSize: '1.1rem',
                       fontWeight: 600,
                       display: 'flex',
                       alignItems: 'center',
                       gap: 1,
                       color: '#1a73e8',
                   }}
               >
                   <ConstructionIcon sx={{ fontSize: '1.3rem' }} />
                   Devam Eden İşler ({buildingJobsList.length})
               </Typography>
           </AccordionSummary>
           <AccordionDetails sx={{ padding: 0, mt: 2 }}>
               <Box sx={{ backgroundColor: alpha('#1a73e8', 0.04), borderRadius: 2, p: 2 }}>
                   <List sx={{ pt: 0 }}>
                       {buildingJobsList.map((job: JobDto, index: number) => (
                           <ListItemButton
                               key={index}
                               onClick={() => window.open(job.url, '_blank')}
                               sx={{
                                   borderRadius: 1.5,
                                   mb: 1,
                                   py: 1,
                                   backgroundColor: '#fff',
                                   boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                   border: '1px solid rgba(0,0,0,0.08)',
                                   transition: 'all 0.2s ease',
                                   '&:hover': {
                                       backgroundColor: '#f8f9fa',
                                       transform: 'translateY(-1px)',
                                       boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                                   }
                               }}
                           >
                               <ListItemText
                                   primary={
                                       <Typography variant="body1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                                           {job.name}
                                       </Typography>
                                   }
                                   secondary={
                                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                           <Badge
                                               variant="dot"
                                               color="warning"
                                               sx={{ '& .MuiBadge-dot': { backgroundColor: '#f57c00' } }}
                                           />
                                           <Typography variant="caption" sx={{ color: '#666' }}>
                                               Build #{job.lastBuild.number}
                                           </Typography>
                                       </Box>
                                   }
                               />
                           </ListItemButton>
                       ))}
                   </List>
               </Box>
           </AccordionDetails>
       </Accordion>
   );
};

export default BuildingJobInformation;