import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Paper, IconButton } from '@mui/material';
import RepositoryItem from './RepositoryItem';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetRepositoryJob } from '../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';

const StyledContainer = styled(Container)(({ theme }) => ({
  margin: '5px auto',
  padding: '10px',
  borderRadius: '8px',
  marginRight: '0px',
  maxWidth: '350px',
  border: '3px solid #e0e0e0',
  transition: 'all 0.3s ease',
  alignSelf: 'flex-start',
  '&:hover': {
    transform: 'translateY(-1px)',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '8px',
  padding: '12px',
  margin: '0px',
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  boxShadow: theme.shadows[3]
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  padding: '3px',
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
      <StyledPaper elevation={1}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem'
          }}
        >
          <span>{groupName}</span>
          <Box sx={{ display: 'flex', gap: 0.3 }}>
            <StyledIconButton onClick={() => window.open(`http://localhost:8080/job/${groupName}`, '_blank')}>
              <LinkIcon fontSize="small" />
            </StyledIconButton>
            <StyledIconButton onClick={handleRemoveGroup}>
              <DeleteIcon fontSize="small" />
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