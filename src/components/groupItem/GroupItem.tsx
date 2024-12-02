import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupItemProps } from '../../infrastructure/dtos/GroupItemProps';

const GroupItem: React.FC<GroupItemProps> = ({ label, checked, onChange }) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={label}
      />
    </div>
  );
};

export default GroupItem;