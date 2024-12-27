import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../infrastructure/store/store';
import { GetGlobalSystemMessage } from '../../infrastructure/store/slices/Notification/GlobalSystemMessage-Slice';
import { Alert, AlertTitle, Box, Collapse, IconButton, Button, Stack, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { keyframes } from '@mui/system';

const HIDDEN_MESSAGES_KEY = 'hiddenSystemMessages';

const slideIn = keyframes`
  from {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const GlobalSystemNotification: React.FC = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean | null>(null);
    const message = useSelector((state: RootState) => state.getGlobalSystemMessage.message);

    const isMessageHidden = (description: string): boolean => {
        try {
            const hiddenMessages = JSON.parse(localStorage.getItem(HIDDEN_MESSAGES_KEY) || '[]');
            return hiddenMessages.includes(description);
        } catch {
            localStorage.setItem(HIDDEN_MESSAGES_KEY, '[]');
            return false;
        }
    };

    useEffect(() => {
        const fetchMessage = () => {
            dispatch(GetGlobalSystemMessage() as any);
        };

        fetchMessage();
        const interval = setInterval(fetchMessage, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
        if (message?.description && open === null) {
            setOpen(!isMessageHidden(message.description));
        }
    }, [message?.description, open]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleNeverShow = () => {
        if (message?.description) {
            try {
                const hiddenMessages = JSON.parse(localStorage.getItem(HIDDEN_MESSAGES_KEY) || '[]');
                if (!hiddenMessages.includes(message.description)) {
                    hiddenMessages.push(message.description);
                    localStorage.setItem(HIDDEN_MESSAGES_KEY, JSON.stringify(hiddenMessages));
                }
                setOpen(false);
            } catch (error) {
                console.error('Mesaj kaydetme hatası:', error);
                localStorage.setItem(HIDDEN_MESSAGES_KEY, JSON.stringify([message.description]));
                setOpen(false);
            }
        }
    };

    if (!message?.description || open === null) return null;

    return (
        <Box sx={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: '80%',
            maxWidth: '800px',
            animation: `${slideIn} 0.5s ease-out`
        }}>
            <Collapse in={open}>
                <Paper elevation={6} sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f6f8ff 0%, #ffffff 100%)',
                }}>
                    <Alert
                        icon={<NotificationsIcon sx={{
                            color: 'primary.main',
                            animation: `${pulse} 2s infinite ease-in-out`
                        }} />}
                        severity="info"
                        sx={{
                            p: 2,
                            '& .MuiAlert-message': {
                                width: '100%'
                            },
                            '& .MuiAlert-action': {
                                alignItems: 'flex-start',
                                pt: 1
                            }
                        }}
                        action={
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleNeverShow}
                                    sx={{
                                        borderRadius: 5,
                                        textTransform: 'none',
                                        fontSize: '0.875rem',
                                        borderColor: 'primary.light',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    Bir daha gösterme
                                </Button>
                                <IconButton
                                    aria-label="close"
                                    size="small"
                                    onClick={handleClose}
                                    title="Kapat"
                                    sx={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                        }
                    >
                        <AlertTitle sx={{ 
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: 'primary.dark',
                            mb: 2
                        }}>
                            Sistem Mesajı
                        </AlertTitle>
                        <Box sx={{ 
                            fontSize: '1rem',
                            color: 'text.primary',
                            lineHeight: 1.5
                        }}>
                            {message.description}
                        </Box>
                    </Alert>
                </Paper>
            </Collapse>
        </Box>
    );
};

export default GlobalSystemNotification;