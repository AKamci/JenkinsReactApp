import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { GetGlobalSystemMessage } from '../../infrastructure/store/slices/Notification/WelcomeUser-Slice';
import { Box, Fade, Paper, Typography } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const WelcomeAnimation: React.FC = () => {
    const dispatch = useAppDispatch();
    const welcomeUser = useAppSelector((state) => state.getWelcomeUser.message);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(GetGlobalSystemMessage());
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    if (!show) return null;

    return (
        <Fade in={show} timeout={1200}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    zIndex: 9999,
                    transform: 'translateY(-10px)',
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(-10px)' },
                        '50%': { transform: 'translateY(0px)' }
                    }
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        minWidth: '320px',
                        padding: '20px 28px',
                        background: 'linear-gradient(145deg, rgba(29,29,29,0.95) 0%, rgba(45,45,45,0.95) 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(15px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.35)',
                        }
                    }}
                >
                    <WavingHandIcon
                        sx={{
                            fontSize: '32px',
                            color: '#FFD700',
                            animation: 'wave 2s ease-in-out infinite',
                            '@keyframes wave': {
                                '0%': { transform: 'rotate(0deg)' },
                                '25%': { transform: 'rotate(-25deg)' },
                                '75%': { transform: 'rotate(25deg)' },
                                '100%': { transform: 'rotate(0deg)' }
                            }
                        }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '1rem',
                                fontWeight: 500,
                                opacity: 0.8,
                                letterSpacing: '1px',
                                marginBottom: '4px',
                                textTransform: 'uppercase',
                                background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            HOŞ GELDİN
                        </Typography>
                        <Typography
                            sx={{
                                color: '#fff',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        >
                            {welcomeUser?.name || '...'}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Fade>
    );
};

export default WelcomeAnimation;