import { createTheme } from '@mui/material';

export type ThemeVariant = 'classic' | 'default' | 'nature' | 'sunset' | 'ocean' | 'lavender' | 'modern';

export const createAppTheme = (isDarkMode: boolean, themeVariant: ThemeVariant = 'default') => {
    if (themeVariant === 'modern') {
        return createTheme({
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
    }

    return createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
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
                    : '#C026D3', 
                light: isDarkMode 
                    ? themeVariant === 'classic' ? '#42A5F5'
                    : themeVariant === 'default' ? '#A78BFA'
                    : themeVariant === 'nature' ? '#34D399'
                    : themeVariant === 'sunset' ? '#FCD34D'
                    : themeVariant === 'ocean' ? '#38BDF8'
                    : '#F0ABFC'
                    : themeVariant === 'default' ? '#818CF8'
                    : themeVariant === 'nature' ? '#10B981'
                    : themeVariant === 'sunset' ? '#FB923C'
                    : themeVariant === 'ocean' ? '#0EA5E9'
                    : '#E879F9',
                dark: isDarkMode 
                    ? themeVariant === 'classic' ? '#1976D2'
                    : themeVariant === 'default' ? '#7C3AED'
                    : themeVariant === 'nature' ? '#047857'
                    : themeVariant === 'sunset' ? '#B45309'
                    : themeVariant === 'ocean' ? '#0369A1'
                    : '#A21CAF'
                    : themeVariant === 'default' ? '#4F46E5'
                    : themeVariant === 'nature' ? '#047857'
                    : themeVariant === 'sunset' ? '#C2410C'
                    : themeVariant === 'ocean' ? '#0369A1'
                    : '#86198F'
            },
            secondary: {
                main: isDarkMode 
                    ? themeVariant === 'default' ? '#EC4899'
                    : themeVariant === 'nature' ? '#14B8A6'
                    : themeVariant === 'sunset' ? '#F97316'
                    : themeVariant === 'ocean' ? '#06B6D4'
                    : '#F472B6'
                    : themeVariant === 'default' ? '#DB2777'
                    : themeVariant === 'nature' ? '#0D9488'
                    : themeVariant === 'sunset' ? '#EA580C'
                    : themeVariant === 'ocean' ? '#0891B2'
                    : '#BE185D',
                light: isDarkMode 
                    ? themeVariant === 'default' ? '#F9A8D4'
                    : themeVariant === 'nature' ? '#2DD4BF'
                    : themeVariant === 'sunset' ? '#FDBA74'
                    : themeVariant === 'ocean' ? '#22D3EE'
                    : '#FBCFE8'
                    : themeVariant === 'default' ? '#F472B6'
                    : themeVariant === 'nature' ? '#14B8A6'
                    : themeVariant === 'sunset' ? '#FB923C'
                    : themeVariant === 'ocean' ? '#06B6D4'
                    : '#EC4899',
                dark: isDarkMode 
                    ? themeVariant === 'default' ? '#BE185D'
                    : themeVariant === 'nature' ? '#0F766E'
                    : themeVariant === 'sunset' ? '#C2410C'
                    : themeVariant === 'ocean' ? '#0E7490'
                    : '#9D174D'
                    : themeVariant === 'default' ? '#9D174D'
                    : themeVariant === 'nature' ? '#115E59'
                    : themeVariant === 'sunset' ? '#9A3412'
                    : themeVariant === 'ocean' ? '#155E75'
                    : '#831843'
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
                    : '#FAF5FF',
                paper: isDarkMode 
                    ? themeVariant === 'classic' ? '#1E1E1E'
                    : themeVariant === 'default' ? '#27282B'
                    : themeVariant === 'nature' ? '#243832'
                    : themeVariant === 'sunset' ? '#2A201C'
                    : themeVariant === 'ocean' ? '#162636'
                    : '#251F33'
                    : themeVariant === 'default' ? '#FFFFFF'
                    : themeVariant === 'nature' ? '#F8FDF9'
                    : themeVariant === 'sunset' ? '#FFFBF8'
                    : themeVariant === 'ocean' ? '#F8FCFF'
                    : '#FDFAFF'
            },
            text: {
                primary: isDarkMode 
                    ? themeVariant === 'classic' ? '#FFFFFF'
                    : '#E6E8EC'
                    : '#1A1B1E',
                secondary: isDarkMode 
                    ? themeVariant === 'classic' ? '#B0B0B0'
                    : '#9DA3AE'
                    : '#6B7280'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        transition: 'all 0.5s ease',
                        scrollbarColor: isDarkMode ? '#475569 #1E293B' : '#CBD5E1 #F1F5F9',
                        '&::-webkit-scrollbar': {
                            width: '10px'
                        },
                        '&::-webkit-scrollbar-track': {
                            background: isDarkMode ? '#1E293B' : '#F1F5F9',
                            borderRadius: '100vh'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: isDarkMode ? '#475569' : '#CBD5E1',
                            borderRadius: '100vh',
                            border: isDarkMode ? '2px solid #1E293B' : '2px solid #F1F5F9',
                            '&:hover': {
                                background: isDarkMode ? '#64748B' : '#94A3B8'
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
                            ? '0 8px 16px -4px rgba(0, 0, 0, 0.9), 0 4px 8px -4px rgba(0, 0, 0, 0.7)'
                            : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        '&:hover': {
                            boxShadow: isDarkMode
                                ? '0 12px 20px -4px rgba(0, 0, 0, 0.95), 0 8px 12px -4px rgba(0, 0, 0, 0.8)'
                                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '1rem',
                        fontWeight: 600,
                        padding: '0.625rem 1.5rem',
                        boxShadow: isDarkMode 
                            ? '0 4px 6px rgba(0, 0, 0, 0.6)'
                            : '0 2px 4px rgba(0, 0, 0, 0.06)',
                        '&:hover': {
                            boxShadow: isDarkMode 
                                ? '0 6px 10px rgba(0, 0, 0, 0.7)'
                                : '0 8px 12px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        },
        typography: {
            fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", sans-serif',
            h1: {
                fontSize: '3rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
                textShadow: isDarkMode ? '0 4px 8px rgba(0,0,0,0.5)' : 'none',
                lineHeight: 1.1
            },
            h2: {
                fontSize: '2.25rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
                textShadow: isDarkMode ? '0 3px 6px rgba(0,0,0,0.4)' : 'none',
                lineHeight: 1.2
            },
            body1: {
                fontSize: '1.125rem',
                lineHeight: 1.8,
                letterSpacing: '0.015em',
                color: isDarkMode ? '#E2E8F0' : '#334155',
                fontWeight: 400
            }
        }
    });
};