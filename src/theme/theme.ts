import { createTheme } from '@mui/material';

export const createAppTheme = (isDarkMode: boolean) => createTheme({
    palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
            main: isDarkMode ? '#60a5fa' : '#3b82f6',
            light: isDarkMode ? '#93c5fd' : '#60a5fa',
            dark: isDarkMode ? '#2563eb' : '#2563eb'
        },
        secondary: {
            main: isDarkMode ? '#a78bfa' : '#f472b6',
            light: isDarkMode ? '#c4b5fd' : '#f9a8d4',
            dark: isDarkMode ? '#7c3aed' : '#ec4899'
        },
        background: {
            default: isDarkMode ? '#111827' : '#f8fafc',
            paper: isDarkMode ? '#1f2937' : '#ffffff'
        },
        text: {
            primary: isDarkMode ? '#f3f4f6' : '#1e293b',
            secondary: isDarkMode ? '#d1d5db' : '#64748b'
        },
        divider: isDarkMode ? 'rgba(229, 231, 235, 0.12)' : 'rgba(148, 163, 184, 0.12)',
        action: {
            active: isDarkMode ? '#60a5fa' : '#3b82f6',
            hover: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.08)',
            selected: isDarkMode ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.16)',
            disabled: isDarkMode ? 'rgba(243, 244, 246, 0.4)' : 'rgba(148, 163, 184, 0.4)',
            disabledBackground: isDarkMode ? 'rgba(243, 244, 246, 0.2)' : 'rgba(148, 163, 184, 0.2)'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    transition: 'all 0.4s ease',
                    scrollbarColor: isDarkMode ? '#4b5563 #1f2937' : '#cbd5e1 #f1f5f9',
                    '&::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: isDarkMode ? '#1f2937' : '#f1f5f9',
                        borderRadius: '100vh'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: isDarkMode ? '#4b5563' : '#cbd5e1',
                        borderRadius: '100vh',
                        border: isDarkMode ? '2px solid #1f2937' : '2px solid #f1f5f9',
                        '&:hover': {
                            background: isDarkMode ? '#6b7280' : '#94a3b8'
                        }
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: isDarkMode 
                        ? '0 4px 8px -2px rgba(0, 0, 0, 0.8), 0 2px 6px -2px rgba(0, 0, 0, 0.6)'
                        : '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                        boxShadow: isDarkMode
                            ? '0 8px 12px -2px rgba(0, 0, 0, 0.9), 0 4px 8px -2px rgba(0, 0, 0, 0.7)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '0.75rem',
                    fontWeight: 500,
                    boxShadow: isDarkMode 
                        ? '0 3px 5px rgba(0, 0, 0, 0.5)'
                        : '0 1px 2px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                        boxShadow: isDarkMode 
                            ? '0 5px 8px rgba(0, 0, 0, 0.6)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)'
                    }
                }
            }
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: isDarkMode ? '#f9fafb' : '#0f172a',
            textShadow: isDarkMode ? '0 3px 6px rgba(0,0,0,0.4)' : 'none',
            lineHeight: 1.2
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: isDarkMode ? '#f9fafb' : '#0f172a',
            textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
            lineHeight: 1.3
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.75,
            letterSpacing: '0.01em',
            color: isDarkMode ? '#e5e7eb' : '#334155',
            fontWeight: 400
        }
    }
});