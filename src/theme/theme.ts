import { createTheme } from '@mui/material';

export const createAppTheme = (isDarkMode: boolean) => createTheme({
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0'
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8', 
            dark: '#7b1fa2'
        },
        background: {
            default: isDarkMode ? '#121212' : '#ffffff',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff'
        },
        text: {
            primary: isDarkMode ? '#ffffff' : '#000000',
            secondary: isDarkMode ? '#b0b0b0' : '#666666'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    transition: 'background-color 0.3s ease'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                }
            }
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500  
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5
        }
    }
});