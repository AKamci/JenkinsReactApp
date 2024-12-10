import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Button, Paper, IconButton } from '@mui/material';
import RepositoryItem from './RepositoryItem';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetRepositoryJob } from '../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: '20px auto',
  padding: '28px',
  maxWidth: '600px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  padding: '24px',
  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
  boxShadow: theme.shadows[8]
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}));

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
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            marginBottom: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{groupName}</span>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <StyledIconButton onClick={() => window.open(`http://jenkins/${groupName}`, '_blank')}>
              <LinkIcon />
            </StyledIconButton>
            <StyledIconButton onClick={handleRemoveGroup}>
              <DeleteIcon />
            </StyledIconButton>
          </Box>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {getRepositoryJobData?.jobs?.map((job) => (
            <RepositoryItem key={job.name} job={job} parent={groupName} />
          ))}
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default GroupBoxItem;