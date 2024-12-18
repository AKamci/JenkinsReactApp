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
import { darkTheme, lightTheme } from '../../../theme/theme';

const StyledCard = styled(Paper)<{ borderColor?: string; isDarkMode?: boolean }>(({ theme, borderColor, isDarkMode }) => ({
  margin: '8px',
  padding: '16px',
  borderRadius: '12px', 
  background: isDarkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
  transition: 'all 0.2s ease',
  maxWidth: '440px',
  minWidth: '300px',
  border: `1px solid ${borderColor || '#f0f0f0'}`,
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
  }
}));

const StyledIconButton = styled(IconButton)({
  padding: '2px',
  borderRadius: '0px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.03)'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem'
  }
});

const GroupTitle = styled(Typography)<{ isDarkMode?: boolean }>(({ isDarkMode }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  color: isDarkMode ? '#fff' : '#2c3e50',
  maxWidth: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  letterSpacing: '0.2px'
}));

const GroupBoxItem: React.FC<GroupCardProps> = ({ groupName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [folderColor, setFolderColor] = useState('#27ae60');
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
        mb: 2,
        pb: 1,
        borderBottom: `1px solid ${borderColor}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FolderIcon
            component="svg"
            onClick={(e: React.MouseEvent<SVGSVGElement>) => handleFolderClick(e as unknown as React.MouseEvent<HTMLElement>)}
            sx={{
              color: folderColor,
              opacity: 0.9,
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)'
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
        >
          <ColorPicker>
            {colors.map((color) => (
              <ColorButton
                key={color}
                sx={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </ColorPicker>
        </Popover>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <StyledIconButton 
            onClick={() => window.open(`${baseUrl}/job/${groupName}`, '_blank')}
            size="small"
            sx={{ color: isDarkMode ? '#5dade2' : '#3498db' }}
          >
            <OpenInNewIcon />
          </StyledIconButton>
          <StyledIconButton 
            onClick={handleRemoveGroup}
            size="small"
            sx={{ color: isDarkMode ? '#e74c3c' : '#c0392b' }}
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