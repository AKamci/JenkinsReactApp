import { createTheme, PaletteMode } from '@mui/material';

export type ThemeVariant = 'classic' | 'default' | 'nature' | 'sunset' | 'ocean' | 'lavender' | 'modern';

export const createAppTheme = (isDarkMode: boolean, themeVariant: ThemeVariant = 'default', isTvMode: boolean = false) => {
    const tvModeScaling = isTvMode ? 1.5 : 1;
    const mode: PaletteMode = isDarkMode ? 'dark' : 'light';

    const themeOptions = themeVariant === 'modern' ? {
        palette: {
            mode,
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
            }
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontSize: `${2.5 * tvModeScaling}rem`,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: isDarkMode ? '#f9fafb' : '#0f172a',
                textShadow: isDarkMode ? '0 3px 6px rgba(0,0,0,0.4)' : 'none',
                lineHeight: 1.2
            },
            h2: {
                fontSize: `${2 * tvModeScaling}rem`,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: isDarkMode ? '#f9fafb' : '#0f172a',
                textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
                lineHeight: 1.3
            },
            body1: {
                fontSize: `${1 * tvModeScaling}rem`,
                lineHeight: 1.75,
                letterSpacing: '0.01em',
                color: isDarkMode ? '#e5e7eb' : '#334155',
                fontWeight: 400
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '0.75rem',
                        fontWeight: 500,
                        padding: isTvMode ? '12px 24px' : '6px 16px',
                        fontSize: isTvMode ? '1.2rem' : '1rem',
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
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        padding: isTvMode ? '12px' : '8px',
                        '& .MuiSvgIcon-root': {
                            fontSize: isTvMode ? '2rem' : '1.5rem'
                        }
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        padding: isTvMode ? '12px 24px' : '8px 16px'
                    }
                }
            }
        }
    } : {
        palette: {
            mode,
            primary: {
                main: isDarkMode 
                    ? themeVariant === 'classic' ? '#2196F3' 
                    : themeVariant === 'default' ? '#8B5CF6' 
                    : themeVariant === 'nature' ? '#10B981' 
                    : themeVariant === 'sunset' ? '#F59E0B' 
                    : themeVariant === 'ocean' ? '#06B6D4' 
                    : '#D946EF' 
                    : themeVariant === 'default' ? '#6366F1' 
                    : themeVariant === 'nature' ? '#059669' 
                    : themeVariant === 'sunset' ? '#EA580C' 
                    : themeVariant === 'ocean' ? '#0284C7' 
                    : '#C026D3'
            },
            background: {
                default: isDarkMode 
                    ? themeVariant === 'classic' ? '#121212' 
                    : themeVariant === 'default' ? '#1A1B1E' 
                    : themeVariant === 'nature' ? '#1A2F25' 
                    : themeVariant === 'sunset' ? '#1F1815' 
                    : themeVariant === 'ocean' ? '#0C1929' 
                    : '#1A1725' 
                    : themeVariant === 'default' ? '#F8FAFC'
                    : themeVariant === 'nature' ? '#F0FDF4'
                    : themeVariant === 'sunset' ? '#FFF7ED'
                    : themeVariant === 'ocean' ? '#F0F9FF'
                    : '#FAF5FF'
            }
        },
        typography: {
            h1: {
                fontSize: `${2.5 * tvModeScaling}rem`,
                fontWeight: 700
            },
            h2: {
                fontSize: `${2 * tvModeScaling}rem`,
                fontWeight: 600
            },
            h3: {
                fontSize: `${1.75 * tvModeScaling}rem`,
                fontWeight: 600
            },
            body1: {
                fontSize: `${1 * tvModeScaling}rem`
            },
            body2: {
                fontSize: `${0.875 * tvModeScaling}rem`
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: isTvMode ? '12px 24px' : '6px 16px',
                        fontSize: isTvMode ? '1.2rem' : '1rem'
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        padding: isTvMode ? '12px' : '8px',
                        '& .MuiSvgIcon-root': {
                            fontSize: isTvMode ? '2rem' : '1.5rem'
                        }
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        padding: isTvMode ? '12px 24px' : '8px 16px'
                    }
                }
            }
        }
    };

    return createTheme(themeOptions);
};