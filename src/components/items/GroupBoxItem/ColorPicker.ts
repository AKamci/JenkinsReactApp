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
  '#27ae60', '#2ecc71', '#3498db','#009688', 
  '#FF69B4', '#FFC107', '#8E24AA', '#4CAF50', 
  '#03A9F4', '#FF9800', '#9C27B0', '#2196F3', 
  '#E91E63', '#795548', '#9E9E9E', '#607D8B', 
  '#3F51B5', '#FFC400', '#8BC34A', '#FF99CC'
];
