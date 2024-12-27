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
    const folderNames = import.meta.env.VITE_FOLDER_NAME?.split(',').map((name: string) => name.trim().toLowerCase()) || [];

    useEffect(() => {
        const fetchBuildingJobs = () => {
            dispatch(getAllBuildingJobs());
        };

        fetchBuildingJobs();
        const intervalId = setInterval(fetchBuildingJobs, 10000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const buildingJobsList = buildingJobs?.jobs?.flatMap((folder: JobDto) => {
        if (folderNames.includes(folder.name?.toLowerCase())) {
            return [];
        }
        return folder.jobs?.flatMap((project: JobDto) =>
            project.jobs?.filter((job: JobDto) =>
                job?.lastBuild?.building === true
            ).map(job => ({
                folder: folder.name,
                project: project.name,
                ...job
            })) || []
        ) || [];
    }) || [];

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
                <Box sx={{ 
                    backgroundColor: alpha('#1a73e8', 0.04), 
                    borderRadius: 2, 
                    p: 2,
                    border: theme => `1px solid ${theme.palette.divider}`
                }}>
                    {buildingJobsList.length > 0 ? (
                        <List sx={{ pt: 0 }}>
                            {buildingJobsList.map((job: any, index: number) => (
                                <ListItemButton
                                    key={index}
                                    onClick={() => window.open(job.url, '_blank')}
                                    sx={{
                                        mb: 1,
                                        borderRadius: 1,
                                        bgcolor: theme => theme.palette.mode === 'dark'
                                            ? alpha(theme.palette.primary.main, 0.15)
                                            : 'rgba(25, 118, 210, 0.08)',
                                        '&:hover': {
                                            bgcolor: theme => theme.palette.mode === 'dark'
                                                ? alpha(theme.palette.primary.main, 0.25)
                                                : 'rgba(25, 118, 210, 0.12)',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'medium',
                                                        color: 'primary.main',
                                                        fontSize: '0.95rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    }}
                                                >
                                                    {`${job.folder} → ${job.project} → ${job.name}`}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                            </Box>
                                        }
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    ) : (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 3,
                                color: 'text.secondary',
                                bgcolor: 'rgba(0,0,0,0.02)',
                                borderRadius: 1
                            }}
                        >
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Devam eden iş bulunmamaktadır.
                            </Typography>
                            <Typography variant="body2" color="text.disabled">
                                Yeni yapılar başladığında burada görünecektir.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default BuildingJobInformation;