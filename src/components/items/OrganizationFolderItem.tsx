import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupItemProps } from '../../infrastructure/dtos/GroupItemProps';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import { useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/store';
import { useScreenSize } from '../../hooks/useScreenSize';

const StyledFormControlLabel = styled(FormControlLabel)({
  margin: '8px 0',
  padding: '8px 16px',
  borderRadius: '8px',
  width: '100%',
  transition: 'background-color 0.2s',
  '& .MuiTypography-root': {
    fontSize: 'inherit'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem'
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const StyledCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#1976d5',
  },
});

const OrganizationFolderItem: React.FC<GroupItemProps> = ({ label, checked, onChange }) => {
  const selectedProjects = useSelector((state: RootState) => state.getProjectName.selectedProjects);
  const { scaling } = useScreenSize();
  
  const isSelectedInStore = selectedProjects.some(project => project.name === label);
  const isChecked = checked || isSelectedInStore;

  const StyledFormControlLabel = styled(FormControlLabel)({
    margin: `${8 * scaling}px 0`,
    padding: `${8 * scaling}px ${16 * scaling}px`,
    borderRadius: `${8 * scaling}px`,
    width: '100%',
    transition: 'background-color 0.2s',
    '& .MuiTypography-root': {
      fontSize: `${1 * scaling}rem`
    },
    '& .MuiSvgIcon-root': {
      fontSize: `${1.5 * scaling}rem`
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  });

  return (
    <div style={{ width: '100%' }}>
      <StyledFormControlLabel
        control={
          <StyledCheckbox
            checked={isChecked}
            onChange={(e) => onChange(e.target.checked)}
            icon={<FolderIcon />}
            checkedIcon={<FolderIcon />}
          />
        }
        label={label}
      />
    </div>
  );
};

export default OrganizationFolderItem;