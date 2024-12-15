import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import RepositoryItem from './RepositoryItem';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetRepositoryJob } from '../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';

const StyledCard = styled(Paper)(({ theme }) => ({
  margin: '8px',
  padding: '16px',
  borderRadius: '12px',
  background: '#ffffff',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
  transition: 'all 0.2s ease',
  maxWidth: '340px',
  minWidth: '300px',
  border: '1px solid #f0f0f0',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
  }
}));

const StyledIconButton = styled(IconButton)({
  padding: '6px',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.03)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem'
  }
});

const GroupTitle = styled(Typography)({
  fontWeight: 500,
  fontSize: '0.95rem',
  color: '#2c3e50',
  maxWidth: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  letterSpacing: '0.2px'
});

interface GroupCardProps {
  groupName: string;
}

const GroupBoxItem: React.FC<GroupCardProps> = ({ groupName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const getRepositoryJobData = useAppSelector(
    (state) => state.getRepositoryJob[groupName]?.jobs
  );
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  useEffect(() => {
    const fetchJobData = () => {
      dispatch(GetRepositoryJob({ jobName: groupName, groupName, apiSettings }));
    };

    fetchJobData();
    const intervalId = setInterval(fetchJobData, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch, groupName, apiSettings]);

  const handleRemoveGroup = () => {
    dispatch(removeSelectedProject(groupName));
  };

  return (
    <StyledCard elevation={0}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        pb: 1,
        borderBottom: '1px solid #f5f5f5'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FolderIcon sx={{ 
            color: '#27ae60',
            opacity: 0.9,
            fontSize: '1.2rem'
          }} />
          <GroupTitle>{groupName}</GroupTitle>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <StyledIconButton 
            onClick={() => window.open(`http://localhost:8080/job/${groupName}`, '_blank')}
            size="small"
            sx={{ color: '#3498db' }}
          >
            <OpenInNewIcon />
          </StyledIconButton>
          <StyledIconButton 
            onClick={handleRemoveGroup}
            size="small"
            sx={{ color: '#e74c3c' }}
          >
            <DeleteOutlineIcon />
          </StyledIconButton>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {getRepositoryJobData?.jobs?.map((job) => (
          <RepositoryItem key={job.name} job={job} parent={groupName} />
        ))}
      </Box>
    </StyledCard>
  );
};

export default GroupBoxItem;