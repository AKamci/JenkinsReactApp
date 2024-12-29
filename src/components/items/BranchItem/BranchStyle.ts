import { styled, Card, CardContent, keyframes } from '@mui/material';

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

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'scaling'
})<{isDarkMode?: boolean, scaling: number}>(({ theme, isDarkMode, scaling = 1 }) => ({
  margin: `${1 * scaling}px 0`,
  position: 'relative',
  cursor: 'pointer', 
  overflow: 'hidden',
  background: theme.palette.background.default,
  backdropFilter: `blur(${2 * scaling}px)`,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: `${1.5 * scaling}px`,
    background: `linear-gradient(90deg, 
      ${theme.palette.background.default} 0%, 
      ${theme.palette.background.paper} 50%, 
      ${theme.palette.background.default} 100%)`,
    transition: 'transform 0.3s ease',
    transform: 'translateX(-100%)'
  },

  '&:hover': {
    boxShadow: theme.shadows[4]
  },

  '&.building': {
    animation: `${pulse} 2s infinite`,
    background: isDarkMode ? theme.palette.warning.dark : theme.palette.warning.light
  }
}));

export const StyledCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== 'scaling'
})<{scaling: number}>(({ scaling = 1 }) => ({
  padding: `${4 * scaling}px ${10 * scaling}px !important`,
  '&:last-child': {
    paddingBottom: `${4 * scaling}px !important`
  }
}));
