import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, IconButton, Popover } from '@mui/material';
import RepositoryItem from '../RepositoryItem';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, RootState, useAppSelector } from '../../../infrastructure/store/store';
import { GetRepositoryJob } from '../../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import GroupCardProps from '../../../infrastructure/props/GroupCardProps';
import { ColorPicker, ColorButton, colors } from './ColorPicker';
import { baseUrl } from '../../../infrastructure/helpers/api-endpoints';
import { setFolderColor } from '../../../infrastructure/store/slices/GeneralSettings/FolderColor-Slice';
import { getScoreForColor } from '../../../infrastructure/commands/SearchCommands';

const StyledCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'borderColor'
})<{ borderColor?: string; isDarkMode?: boolean }>(({ theme, borderColor, isDarkMode }) => ({
  margin: '8px',
  padding: '12px',
  borderRadius: '12px',
  background: isDarkMode 
    ? `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`
    : `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
  boxShadow: isDarkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
    : '0 8px 32px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  maxWidth: '840px',
  minWidth: '320px',
  border: `1px solid ${borderColor || (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')}`,
  '&:hover': {
    boxShadow: isDarkMode 
      ? '0 12px 40px rgba(0, 0, 0, 0.3)' 
      : '0 12px 40px rgba(0, 0, 0, 0.12)'
  }
}));

const StyledIconButton = styled(IconButton)(({ }) => ({
  padding: '4px',
  borderRadius: '6px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.08)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '0.9rem'
  }
}));

const GroupTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode?: boolean }>(({ isDarkMode }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  color: isDarkMode ? '#fff' : '#1a2027',
  maxWidth: '220px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  letterSpacing: '0.3px',
  textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
}));

const GroupBoxItem: React.FC<GroupCardProps> = ({ groupName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const folderColor = useAppSelector((state: RootState) => state.folderColor.color);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [repositoryScores, setRepositoryScores] = useState<{ [key: string]: number }>({});
  const isDarkMode = useAppSelector((state: RootState) => state.generalTheme.isDarkMode);
  const selectedColors = useAppSelector((state: RootState) => state.colorFilter.selectedColors);
 
  const getRepositoryJobData = useAppSelector(
    (state) => state.getRepositoryJob[groupName]?.jobs
  );
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  const handleColorClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleColorSelect = useCallback((newColor: string) => {
    dispatch(setFolderColor(newColor));
    setAnchorEl(null);
  }, [dispatch]);

  const handleScoreChange = useCallback((jobName: string, score: number) => {
    setRepositoryScores(prev => {
      const newScores = { ...prev };
      if (newScores[jobName] !== score) {
        newScores[jobName] = score;
        return newScores;
      }
      return prev;
    });
  }, []);

  const getSortedRepositories = useMemo(() => {
    if (!getRepositoryJobData?.jobs) return [];
    
    let filteredJobs = [...getRepositoryJobData.jobs];
    
    if (selectedColors.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        const score = repositoryScores[job.name] || 0;
        return selectedColors.some(color => getScoreForColor(color, score));
      });
    }
    
    return filteredJobs.sort((a, b) => {
      const scoreA = repositoryScores[a.name] || 0;
      const scoreB = repositoryScores[b.name] || 0;
      return scoreB - scoreA;
    });
  }, [getRepositoryJobData?.jobs, repositoryScores, selectedColors]);

  useEffect(() => {
    const fetchJobData = () => {
      dispatch(GetRepositoryJob({ jobName: groupName, groupName, apiSettings }));
    };

    fetchJobData();
    const intervalId = setInterval(fetchJobData, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch, groupName, apiSettings]);

  const handleRemoveGroup = useCallback(() => {
    dispatch(removeSelectedProject(groupName));
  }, [dispatch, groupName]);

  const handlePopoverClose = useCallback(() => setAnchorEl(null), []);

  const handleOpenInNewTab = useCallback(() => {
    window.open(`${baseUrl}/job/${groupName}`, '_blank');
  }, [groupName]);

  return (
    <StyledCard elevation={0} borderColor={folderColor} isDarkMode={isDarkMode}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        mb: 1.5,
        pb: 1,
        borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderIcon
            sx={{
              color: folderColor,
              opacity: 0.95,
              fontSize: '1.3rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              '&:hover': {
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }
            }}
          />
          <Box onClick={handleColorClick} sx={{ cursor: 'pointer' }}>
            <GroupTitle isDarkMode={isDarkMode}>{groupName}</GroupTitle>
          </Box>
        </Box>
        
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.08)'
            }
          }}
        >
          <ColorPicker>
            {colors.map((colorOption) => (
              <ColorButton
                key={colorOption}
                sx={{ 
                  backgroundColor: colorOption,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                  }
                }}
                onClick={() => handleColorSelect(colorOption)}
              />
            ))}
          </ColorPicker>
        </Popover>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <StyledIconButton 
            onClick={handleOpenInNewTab}
            size="small"
            sx={{ 
              color: isDarkMode ? '#60a5fa' : '#3b82f6',
              '&:hover': {
                color: isDarkMode ? '#93c5fd' : '#2563eb'
              }
            }}
          >
            <OpenInNewIcon />
          </StyledIconButton>
          <StyledIconButton 
            onClick={handleRemoveGroup}
            size="small"
            sx={{ 
              color: isDarkMode ? '#f87171' : '#ef4444',
              '&:hover': {
                color: isDarkMode ? '#fca5a5' : '#dc2626'
              }
            }}
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
        {getSortedRepositories.map((job) => (
          <RepositoryItem 
            key={job.name} 
            job={{
              ...job,
              onScoreChange: (score) => handleScoreChange(job.name, score)
            }} 
            parent={groupName} 
          />
        ))}
      </Box>
    </StyledCard>
  );
};

export default GroupBoxItem;