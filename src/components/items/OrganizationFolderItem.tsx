import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupItemProps } from '../../infrastructure/dtos/GroupItemProps';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';

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
    color: '#1976d2',
  },
});

const OrganizationFolderItem: React.FC<GroupItemProps> = ({ label, checked, onChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <StyledFormControlLabel
        control={
          <StyledCheckbox
            checked={checked}
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