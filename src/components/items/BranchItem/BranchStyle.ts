import { styled, Card, CardContent, keyframes } from '@mui/material';
import { darkTheme } from '../../../theme/theme';

export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(4, 150, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(4, 150, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(4, 150, 255, 0);
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledCard = styled(Card)(({ theme }) => ({
  margin: '1px 0',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.95)',
  //background: darkTheme.palette.background.default,
  backdropFilter: 'blur(2px)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1.5px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
    //background: darkTheme.palette.background.default,
    transition: 'transform 0.3s ease',
    transform: 'translateX(-100%)'
  },

  '&:hover': {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    '&:before': {
      transform: 'translateX(100%)'
    }
  },

  '&.building': {
    animation: `${pulse} 2s infinite`,
    background: 'rgba(255,244,222,0.95)'
  }
}));

export const StyledCardContent = styled(CardContent)({
  padding: '4px 10px !important',
  '&:last-child': { 
    paddingBottom: '4px !important' 
  }
});
