import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ColorPicker = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '12px',
  maxWidth: '200px'
});

export const ColorButton = styled(Box)({
  width: '24px',
  height: '24px',
  borderRadius: '100%',
  cursor: 'pointer',
  border: '0.5px solid white',
  boxShadow: '0 0 4px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
    border: '0.5px solid white',
  }
});

export const colors = [
  '#27ae60', '#2ecc71', '#3498db','#009688' 
];
