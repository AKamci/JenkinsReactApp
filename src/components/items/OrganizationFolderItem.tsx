import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupItemProps } from '../../infrastructure/dtos/GroupItemProps';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import { useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/store';

const StyledFormControlLabel = styled(FormControlLabel)({
  margin: '8px 0',
  padding: '8px 16px',
  borderRadius: '8px',
  width: '100%',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const StyledCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#1976d5',
  },
});

//Buraya bak unutma..
//Hata slice dan almasına rağmen göstermiyor.

const OrganizationFolderItem: React.FC<GroupItemProps> = ({ label, checked, onChange }) => {
  const selectedProjects = useSelector((state: RootState) => state.getProjectName.selectedProjects);
  
  const isSelectedInStore = selectedProjects.some(project => project.name === label);
  
  const isChecked = checked || isSelectedInStore;

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