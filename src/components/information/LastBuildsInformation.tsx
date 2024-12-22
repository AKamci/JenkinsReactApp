import React, { useMemo } from 'react';
import { ListItemButton, ListItemText, Typography, Box, List, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useAppSelector } from '../../infrastructure/store/store';
import BuildIcon from '@mui/icons-material/Build';
import { JobDto } from '../../infrastructure/dtos/JobDto';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ProcessedBuild {
  folder: string;
  project: string;
  branch: string;
  buildNumber: number;
  duration: number;
  buildUrl: string;
}

const LastBuildsInformation: React.FC = () => {
  const lastBuilds = useAppSelector((state) => state.getLastBuildsForInformation.builds);

  const processedBuilds = useMemo(() => {
    const builds: ProcessedBuild[] = [];

    const processJobs = (jobs: JobDto[], folderName: string = '') => {
      jobs.forEach(job => {
        if (job.jobs) {
          if (job._class === 'jenkins.branch.OrganizationFolder') {
            processJobs(job.jobs, job.name);
          }
          else if (job._class === 'org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject') {
            job.jobs.forEach(branchJob => {
              if (branchJob.lastBuild && Object.keys(branchJob.lastBuild).length > 0) {
                builds.push({
                  folder: folderName,
                  project: job.name,
                  branch: branchJob.name,
                  buildNumber: branchJob.lastBuild.number,
                  duration: branchJob.lastBuild.duration,
                  buildUrl: branchJob.lastBuild.url
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

    return builds.sort((a, b) => b.buildNumber - a.buildNumber).slice(0, 20);
  }, [lastBuilds]);

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
            fontSize: '1rem',
            fontWeight: 600,
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
        <Box sx={{ backgroundColor: alpha('#1a73e8', 0.04), borderRadius: 2, p: 1 }}>
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
                    py: 0.5,
                    backgroundColor: '#fff',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                        {`${build.folder} -> ${build.project} -> ${build.branch} `}
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