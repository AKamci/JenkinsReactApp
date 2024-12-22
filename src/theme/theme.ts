    // Start of Selection
    import { createTheme } from '@mui/material/styles';
    
    export const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
          contrastText: '#ffffff',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
          contrastText: '#ffffff',
        },
        warning: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
          contrastText: '#ffffff',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
          contrastText: '#ffffff',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
          contrastText: '#ffffff',
        },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5',
          level1: '#f0f0f0',
          level2: '#e0e0e0',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        action: {
          active: 'rgba(0, 0, 0, 0.54)',
          hover: 'rgba(0, 0, 0, 0.04)',
          selected: 'rgba(0, 0, 0, 0.08)',
          disabled: 'rgba(0, 0, 0, 0.26)',
          disabledBackground: 'rgba(0, 0, 0, 0.12)',
        },
        common: {
          black: '#000000',
          white: '#ffffff',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.01562em',
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: '-0.00833em',
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: '0em',
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 700,
          lineHeight: 1.5,
          letterSpacing: '0.00735em',
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 700,
          lineHeight: 1.6,
          letterSpacing: '0em',
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.5,
          letterSpacing: '0.0075em',
        },
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
        },
        body2: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        },
        button: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.75,
          letterSpacing: '0.02857em',
          textTransform: 'none',
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.66,
          letterSpacing: '0.03333em',
        },
        overline: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 2.66,
          letterSpacing: '0.08333em',
          textTransform: 'uppercase',
        },
      },
      shape: {
        borderRadius: 8,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
      spacing: 8,
      shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12)',
        '0px 1px 5px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px rgba(0,0,0,0.12)',
        '0px 1px 8px rgba(0,0,0,0.2), 0px 3px 4px rgba(0,0,0,0.14), 0px 3px 3px rgba(0,0,0,0.12)',
        '0px 2px 4px rgba(0,0,0,0.2), 0px 4px 5px rgba(0,0,0,0.14), 0px 1px 10px rgba(0,0,0,0.12)',
        // Diğer gölgeler buraya eklenebilir...
      ],
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 500,
            },
            containedPrimary: {
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            },
            containedSecondary: {
              backgroundColor: '#9c27b0',
              '&:hover': {
                backgroundColor: '#7b1fa2',
              },
            },
          },
        },
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: 'h1',
              h2: 'h2',
              h3: 'h3',
              h4: 'h4',
              h5: 'h5',
              h6: 'h6',
              subtitle1: 'h6',
              subtitle2: 'h6',
              body1: 'p',
              body2: 'p',
              button: 'span',
              caption: 'span',
              overline: 'span',
            },
          },
        },
      },
    });
    
    export const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#90caf9',
          light: '#e3f2fd',
          dark: '#42a5f5',
          contrastText: '#000000',
        },
        secondary: {
          main: '#ce93d8',
          light: '#f3e5f5',
          dark: '#ab47bc',
          contrastText: '#000000',
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
          contrastText: '#000000',
        },
        warning: {
          main: '#ffa726',
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#000000',
        },
        info: {
          main: '#29b6f6',
          light: '#4fc3f7',
          dark: '#0288d1',
          contrastText: '#000000',
        },
        success: {
          main: '#66bb6a',
          light: '#81c784',
          dark: '#388e3c',
          contrastText: '#000000',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
          level1: '#1a1a1a',
          level2: '#333333',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
          active: 'rgba(255, 255, 255, 0.54)',
          hover: 'rgba(255, 255, 255, 0.04)',
          selected: 'rgba(255, 255, 255, 0.08)',
          disabled: 'rgba(255, 255, 255, 0.26)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
        common: {
          black: '#000000',
          white: '#ffffff',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.01562em',
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: '-0.00833em',
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: '0em',
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 700,
          lineHeight: 1.5,
          letterSpacing: '0.00735em',
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 700,
          lineHeight: 1.6,
          letterSpacing: '0em',
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.5,
          letterSpacing: '0.0075em',
        },
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
        },
        body2: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        },
        button: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.75,
          letterSpacing: '0.02857em',
          textTransform: 'none',
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.66,
          letterSpacing: '0.03333em',
        },
        overline: {
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 2.66,
          letterSpacing: '0.08333em',
          textTransform: 'uppercase',
        },
      },
      shape: {
        borderRadius: 8,
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
      spacing: 8,
      shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12)',
        '0px 1px 5px rgba(0,0,0,0.2), 0px 2px 2px rgba(0,0,0,0.14), 0px 3px 1px rgba(0,0,0,0.12)',
        '0px 1px 8px rgba(0,0,0,0.2), 0px 3px 4px rgba(0,0,0,0.14), 0px 3px 3px rgba(0,0,0,0.12)',
        '0px 2px 4px rgba(0,0,0,0.2), 0px 4px 5px rgba(0,0,0,0.14), 0px 1px 10px rgba(0,0,0,0.12)',
        // Diğer gölgeler buraya eklenebilir...
      ],
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 500,
            },
            containedPrimary: {
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            },
            containedSecondary: {
              backgroundColor: '#9c27b0',
              '&:hover': {
                backgroundColor: '#7b1fa2',
              },
            },
          },
        },
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: 'h1',
              h2: 'h2',
              h3: 'h3',
              h4: 'h4',
              h5: 'h5',
              h6: 'h6',
              subtitle1: 'h6',
              subtitle2: 'h6',
              body1: 'p',
              body2: 'p',
              button: 'span',
              caption: 'span',
              overline: 'span',
            },
          },
        },
        // Diğer bileşen düzenlemeleri buraya eklenebilir...
      },
    });