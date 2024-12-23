import React, { useMemo } from 'react';
import { ListItemButton, ListItemText, Typography, Box, List, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useAppSelector } from '../../infrastructure/store/store';
import BuildIcon from '@mui/icons-material/Build';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BuildResult, getBuildResultDetails } from '../../infrastructure/Enums/BuildResult';

interface ProcessedBuild {
  folder: string;
  project: string;
  branch: string;
  buildNumber: number;
  duration: number;
  buildUrl: string;
  timestamp: number;
  result: BuildResult | null;
}

const LastBuildsInformation: React.FC = () => {
  const lastBuilds = useAppSelector((state) => state.getLastBuildsForInformation.builds);
  const folderNames = import.meta.env.VITE_FOLDER_NAME?.split(',').map((name: string) => name.trim().toLowerCase()) || [];

  const processedBuilds = useMemo(() => {
    const builds: ProcessedBuild[] = [];

    const processJobs = (jobs: JobDto[], folderName: string = '') => {
      jobs.forEach(job => {
        if (folderNames.includes(job.name.toLowerCase())) {
          return;
        }

        if (job.jobs) {
          if (job._class === 'jenkins.branch.OrganizationFolder') {
            processJobs(job.jobs, job.name);
          }
          else if (job._class === 'org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject') {
            job.jobs.forEach(branchJob => {
              if (branchJob.lastBuild && 
                  Object.keys(branchJob.lastBuild).length > 0 && 
                  branchJob.lastBuild.result !== null) {
                builds.push({
                  folder: folderName,
                  project: job.name,
                  branch: branchJob.name,
                  buildNumber: branchJob.lastBuild.number,
                  duration: branchJob.lastBuild.duration,
                  buildUrl: branchJob.lastBuild.url,
                  timestamp: branchJob.lastBuild.timestamp,
                  result: branchJob.lastBuild.result
                });
              }
            });
          }
        }
      });
    };

    if (lastBuilds?.jobs) {
      processJobs(lastBuilds.jobs);
    }

    return builds.sort((a, b) => b.timestamp - a.timestamp).slice(0, 20);
  }, [lastBuilds, folderNames]);

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
          variant="h6"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1a73e8',
          }}
        >
          <BuildIcon sx={{ fontSize: '1.2rem' }} />
          Tamamlanan İşler ({processedBuilds.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, mt: 1 }}>
        <Box sx={{ 
          backgroundColor: theme => theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.15)
            : alpha('#1a73e8', 0.04),
          borderRadius: 2,
          p: 1
        }}>
          {processedBuilds.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', py: 1 }}>
              Henüz tamamlanan iş bulunmuyor
            </Typography>
          ) : (
            <List sx={{ pt: 0 }}>
              {processedBuilds.map((build, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => window.open(build.buildUrl, '_blank')}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    py: 0.75,
                    px: 1.5,
                    backgroundColor: theme => {
                      const resultDetails = getBuildResultDetails(build.result);
                      switch (resultDetails.severity) {
                        case 'success':
                          return alpha(theme.palette.success.main, 0.05);
                        case 'error':
                          return alpha(theme.palette.error.main, 0.05);
                        case 'warning':
                          return alpha(theme.palette.warning.main, 0.05);
                        default:
                          return alpha(theme.palette.info.main, 0.05);
                      }
                    },
                    '&:hover': {
                      backgroundColor: theme => {
                        const resultDetails = getBuildResultDetails(build.result);
                        switch (resultDetails.severity) {
                          case 'success':
                            return alpha(theme.palette.success.main, 0.1);
                          case 'error':
                            return alpha(theme.palette.error.main, 0.1);
                          case 'warning':
                            return alpha(theme.palette.warning.main, 0.1);
                          default:
                            return alpha(theme.palette.info.main, 0.1);
                        }
                      },
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme => {
                              const resultDetails = getBuildResultDetails(build.result);
                              switch (resultDetails.severity) {
                                case 'success':
                                  return theme.palette.success.main;
                                case 'error':
                                  return theme.palette.error.main;
                                case 'warning':
                                  return theme.palette.warning.main;
                                default:
                                  return theme.palette.info.main;
                              }
                            },
                            fontWeight: 500,
                            fontSize: '0.8rem'
                          }}
                        >
                          {getBuildResultDetails(build.result).description}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontSize: '0.8rem',
                            flex: 1
                          }}
                        >
                          {`${build.project}/${build.branch}`}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {new Date(build.timestamp).toLocaleString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          display: 'flex',
                          gap: 1
                        }}
                      >
                        <span>#{build.buildNumber}</span>
                        <span>•</span>
                        <span>{Math.round(build.duration / 1000)}s</span>
                        {build.folder && (
                          <>
                            <span>•</span>
                            <span>{build.folder}</span>
                          </>
                        )}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LastBuildsInformation;