import React, { useEffect, useState, useRef } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  Box, 
  IconButton, 
  Typography,
  List,
  ListItem,
  Paper,
  Fab,
  Badge,
  Avatar,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { toggleChat } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';
import io from 'socket.io-client';
import { useTheme } from '@mui/material/styles';
import birthdays from '../../data/birthdays.json';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

const STORAGE_KEY = 'jenkins_chat_messages';
const LAST_READ_KEY = 'jenkins_chat_last_read';

const loadMessagesFromStorage = (): Message[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveMessagesToStorage = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const getLastReadTime = (): number => {
  return Number(localStorage.getItem(LAST_READ_KEY)) || 0;
};

const setLastReadTime = (time: number) => {
  localStorage.setItem(LAST_READ_KEY, time.toString());
};

const isBirthday = (username: string): boolean => {
  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = today.getDate().toString().padStart(2, '0');
  const currentDate = `${currentMonth}-${currentDay}`;
  
  return birthdays.birthdays.some(
    birthday => birthday.name === username && birthday.date === currentDate
  );
};

export const ChatWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const isChatOpen = useAppSelector((state) => state.funFeatures.isChatOpen);
  const username = useAppSelector((state) => state.getWelcomeUser.userDetails?.fullName || 'Anonim');
  
  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage());
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    saveMessagesToStorage(messages);
    
    const lastRead = getLastReadTime();
    const newUnreadCount = messages.filter(msg => 
      Number(msg.id) > lastRead && msg.user !== username
    ).length;
    setUnreadCount(newUnreadCount);

    if (newUnreadCount > 0 && !isChatOpen) {
      document.title = `(${newUnreadCount}) Yeni Mesaj!`;
    } else {
      document.title = 'Jenkins React App';
    }
  }, [messages, isChatOpen, username]);

  useEffect(() => {
    if (isChatOpen) {
      const latestMessageTime = Math.max(...messages.map(msg => Number(msg.id)), 0);
      setLastReadTime(latestMessageTime);
      setUnreadCount(0);
      document.title = 'Jenkins React App';
    }
  }, [isChatOpen, messages]);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_CHAT_SERVER_URL);
    
    socketRef.current.on('connect', () => {
      console.log('Sohbete bağlanıldı!');
      socketRef.current?.emit('requestMessages');
    });

    socketRef.current.on('message', (message: Message) => {
      setMessages(prev => {
        if (prev.some(m => m.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
    });

    socketRef.current.on('previousMessages', (previousMessages: Message[]) => {
      setMessages(prev => {
        const newMessages = [...prev];
        previousMessages.forEach(message => {
          if (!newMessages.some(m => m.id === message.id)) {
            newMessages.push(message);
          }
        });
        return newMessages.sort((a, b) => Number(a.id) - Number(b.id));
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClose = () => {
    dispatch(toggleChat());
  };

  const handleSend = () => {
    if (newMessage.trim() && socketRef.current) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      socketRef.current.emit('message', message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  if (!isChatOpen) {
    return (
      <Badge 
        badgeContent={unreadCount} 
        color="error"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          '& .MuiBadge-badge': {
            animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' },
            },
          },
        }}
      >
        <Fab
          color="primary"
          onClick={() => dispatch(toggleChat())}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          }}
        >
          <ChatIcon />
        </Fab>
      </Badge>
    );
  }

  return (
    <Dialog
      open={isChatOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { 
          height: '80vh',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)'
            : 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
          borderRadius: '16px',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
        color: 'white',
        borderRadius: '16px 16px 0 0'
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Takım Sohbeti</Typography>
          <IconButton onClick={handleClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            backgroundColor: 'transparent',
            p: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.mode === 'dark' ? '#333333' : '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.mode === 'dark' ? '#666666' : '#888888',
              borderRadius: '4px',
            },
          }}
        >
          <List>
            {messages.map((message) => (
              <ListItem 
                key={message.id}
                sx={{
                  flexDirection: 'column',
                  alignItems: message.user === username ? 'flex-end' : 'flex-start',
                  mb: 2,
                  padding: 0
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 0.5,
                  flexDirection: message.user === username ? 'row-reverse' : 'row'
                }}>
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24,
                    bgcolor: message.user === username ? '#2196F3' : '#9C27B0',
                    fontSize: '0.8rem'
                  }}>
                    {message.user[0].toUpperCase()}
                  </Avatar>
                  <Typography 
                    variant="caption"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      fontWeight: 500,
                      maxWidth: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {message.user === username ? 'Sen' : message.user}
                    {isBirthday(message.user) && '🎂'}
                    • {message.timestamp}
                  </Typography>
                </Box>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 1.5,
                    maxWidth: '70%',
                    borderRadius: message.user === username ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                    background: message.user === username 
                      ? theme.palette.mode === 'dark' ? '#1e3a5f' : '#E3F2FD'
                      : theme.palette.mode === 'dark' ? '#2d2d2d' : 'white',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 2px 4px rgba(0, 0, 0, .3)'
                      : '0 2px 4px rgba(0, 0, 0, .1)',
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                    msUserSelect: 'text',
                    cursor: 'text',
                  }}
                >
                  <Typography 
                    sx={{ 
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.95rem',
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      userSelect: 'text',
                      WebkitUserSelect: 'text',
                      msUserSelect: 'text',
                      cursor: 'text',
                      '&::selection': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#4a6da7' : '#b3d4fc',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                      },
                      '&::-moz-selection': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#4a6da7' : '#b3d4fc',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                      }
                    }}
                  >
                    {message.text}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <Divider />
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          p: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : 'white',
          borderRadius: '12px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 2px 4px rgba(0,0,0,0.3)'
            : '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? '#404040' : '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? '#666666' : '#bdbdbd',
                },
              },
              '& .MuiInputBase-input': {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              }
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            sx={{
              background: newMessage.trim() ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' : 'grey.300',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};