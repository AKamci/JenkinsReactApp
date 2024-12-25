import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Spinner = (props: { color?: 'primary' | 'secondary' | 'success' | 'danger' }) => {
  const theme = useTheme();
  const color = props.color || 'primary';

  const getColor = () => {
    switch(color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main; 
      case 'success':
        return theme.palette.success.main;
      case 'danger':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <CircularProgress
        size={16}
        thickness={4}
        sx={{
          color: getColor(),
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      />
      <Box
        component="span"
        sx={{
          position: 'absolute',
          clip: 'rect(0 0 0 0)',
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        Yükleniyor...
      </Box>
    </Box>
  );
};

export default React.memo(Spinner);
