import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, IconButton, Popover } from '@mui/material';
import RepositoryItem from '../RepositoryItem';
import { useDispatch } from 'react-redux';
import { removeSelectedProject } from '../../../infrastructure/store/slices/File/Projects-Slice';
import { AppDispatch, useAppSelector } from '../../../infrastructure/store/store';
import { GetRepositoryJob } from '../../../infrastructure/store/slices/Job/GetRepositoryJob-Slice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import GroupCardProps from '../../../infrastructure/props/GroupCardProps';
import { ColorPicker, ColorButton, colors } from './ColorPicker';
import { baseUrl } from '../../../infrastructure/helpers/api-endpoints';

const StyledCard = styled(Paper)<{ borderColor?: string; isDarkMode?: boolean }>(({ theme, borderColor, isDarkMode }) => ({
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
  maxWidth: '440px',
  minWidth: '320px',
  border: `1px solid ${borderColor || (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')}`,
  '&:hover': {
    boxShadow: isDarkMode 
      ? '0 12px 40px rgba(0, 0, 0, 0.3)' 
      : '0 12px 40px rgba(0, 0, 0, 0.12)'
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
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

const GroupTitle = styled(Typography)<{ isDarkMode?: boolean }>(({ isDarkMode }) => ({
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
  const [folderColor, setFolderColor] = useState('#2ecc71');
  const [borderColor, setBorderColor] = useState('#f0f0f0');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorPickerType, setColorPickerType] = useState<'folder' | 'border'>('folder');
  const isDarkMode = useAppSelector((state) => state.generalTheme.isDarkMode);
 
  const getRepositoryJobData = useAppSelector(
    (state) => state.getRepositoryJob[groupName]?.jobs
  );
  const apiSettings = useAppSelector((state) => state.getApiSettings.selectedApiSettings);

  const handleFolderClick = (event: React.MouseEvent<HTMLElement>) => {
    setColorPickerType('folder');
    setAnchorEl(event.currentTarget);
  };

  const handleBorderClick = (event: React.MouseEvent<HTMLElement>) => {
    setColorPickerType('border');
    setAnchorEl(event.currentTarget);
  };

  const handleColorSelect = (color: string) => {
    if (colorPickerType === 'folder') {
      setFolderColor(color);
    } else {
      setBorderColor(color);
    }
    setAnchorEl(null);
  };

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
    <StyledCard elevation={0} borderColor={borderColor} isDarkMode={isDarkMode}>
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
            component="svg"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => handleFolderClick(e as unknown as React.MouseEvent<HTMLElement>)}
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
          <GroupTitle onClick={handleBorderClick} style={{cursor: 'pointer'}} isDarkMode={isDarkMode}>{groupName}</GroupTitle>
        </Box>
        
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
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
            {colors.map((color) => (
              <ColorButton
                key={color}
                sx={{ 
                  backgroundColor: color,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                  }
                }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </ColorPicker>
        </Popover>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <StyledIconButton 
            onClick={() => window.open(`${baseUrl}/job/${groupName}`, '_blank')}
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
        {getRepositoryJobData?.jobs?.map((job) => (
          <RepositoryItem key={job.name} job={job} parent={groupName} />
        ))}
      </Box>
    </StyledCard>
  );
};

export default GroupBoxItem;