import React from 'react';
import { 
  List, 
  ListItem, 
  Box, 
  Avatar, 
  Typography, 
  Paper 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Message } from './types';
import { isBirthday, formatTimestamp } from './utils';

interface MessageListProps {
  messages: Message[];
  username: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  username, 
  messagesEndRef 
}) => {
  const theme = useTheme();

  return (
    <List sx={{ 
      padding: 2,
      background: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
      borderRadius: 2,
      minHeight: '80vh',
      overflowY: 'auto',
      scrollBehavior: 'smooth',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'dark' 
          ? 'rgba(51, 51, 51, 0.6)' 
          : 'rgba(241, 241, 241, 0.6)',
        borderRadius: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark'
          ? 'rgba(102, 102, 102, 0.8)'
          : 'rgba(136, 136, 136, 0.8)',
        borderRadius: '8px',
        '&:hover': {
          background: theme.palette.mode === 'dark'
            ? 'rgba(102, 102, 102, 1)'
            : 'rgba(136, 136, 136, 1)',
        }
      }
    }}>
      {messages.map((message) => (
        <ListItem 
          key={message.id}
          sx={{
            flexDirection: 'column',
            alignItems: message.user === username ? 'flex-end' : 'flex-start',
            mb: 2.5,
            padding: 0
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 0.8,
            flexDirection: message.user === username ? 'row-reverse' : 'row'
          }}>
            <Avatar sx={{ 
              width: 28, 
              height: 28,
              bgcolor: message.user === username ? '#1976d2' : '#7b1fa2',
              fontSize: '0.9rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {message.user[0].toUpperCase()}
            </Avatar>
            <Typography 
              variant="caption"
              sx={{
                color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#424242',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              {message.user === username ? 'Sen' : message.user}
              {isBirthday(message.user) && ' 🎂'}
              <span style={{ opacity: 0.7, marginLeft: 4 }}>
                • {formatTimestamp(message.timestamp)}
              </span>
            </Typography>
          </Box>
          <Paper 
            elevation={3}
            sx={{ 
              p: 2,
              maxWidth: '70%',
              borderRadius: message.user === username ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
              background: message.user === username 
                ? theme.palette.mode === 'dark' ? '#1565c0' : '#bbdefb'
                : theme.palette.mode === 'dark' ? '#333333' : '#ffffff',
              color: message.user === username
                ? theme.palette.mode === 'dark' ? '#ffffff' : '#0d47a1'
                : theme.palette.mode === 'dark' ? '#ffffff' : '#212121',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
              }
            }}
          >
            <Typography sx={{ 
              wordBreak: 'break-word',
              lineHeight: 1.5,
              fontSize: '0.95rem'
            }}>
              {message.text}
            </Typography>
          </Paper>
        </ListItem>
      ))}
      <div ref={messagesEndRef} style={{ height: 1 }} />
    </List>
  );
}; 