import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  IconButton, 
  Typography,
  Paper,
  Fab,
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListItemButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { toggleChat } from '../../infrastructure/store/slices/Settings/FunFeatures-Slice';
import { useTheme } from '@mui/material/styles';

import { Message, Room } from './chat/types';
import { loadMessagesFromStorage, loadRoomsFromStorage, saveMessagesToStorage, saveRoomsToStorage } from './chat/utils';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';
import { RoomTabs } from './chat/RoomTabs';
import { RoomMenu } from './chat/RoomMenu';
import { useSocket } from './chat/useSocket';

export const ChatWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const isChatOpen = useAppSelector((state) => state.funFeatures.isChatOpen);
  const username = useAppSelector((state) => state.getWelcomeUser.userDetails?.fullName || 'Anonim');
  
  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage());
  const [rooms, setRooms] = useState<Room[]>(loadRoomsFromStorage());
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTab, setCurrentTab] = useState<'global' | string>('global');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socketRef = useSocket({
    username,
    setMessages,
    setRooms,
    setCurrentTab
  });

  // Mesajları yerel depolamaya kaydetme
  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  // Odaları yerel depolamaya kaydetme
  useEffect(() => {
    saveRoomsToStorage(rooms);
  }, [rooms]);

  const handleClose = () => {
    dispatch(toggleChat());
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (newMessage.trim() && socketRef.current) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        text: newMessage.trim(),
        timestamp: new Date().getTime(),
        type: currentTab === 'global' ? 'global' : 'room',
        ...(currentTab !== 'global' && { roomId: currentTab })
      };

      if (currentTab === 'global') {
        socketRef.current.emit('globalMessage', message);
      } else {
        socketRef.current.emit('roomMessage', { roomId: currentTab, message });
      }
      
      setNewMessage('');
    }
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim() && socketRef.current) {
      const roomId = `room_${Date.now()}`;
      socketRef.current.emit('createRoom', {
        roomId,
        roomName: newRoomName.trim()
      });
      setNewRoomName('');
      setAnchorEl(null);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('joinRoom', roomId);
    }
  };

  const handleLeaveRoom = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leaveRoom', roomId);
      setCurrentTab('global');
    }
  };

  const filteredMessages = messages.filter(message => 
    currentTab === 'global' 
      ? message.type === 'global'
      : message.type === 'room' && message.roomId === currentTab
  );

  const currentRoom = rooms.find(room => room.id === currentTab);

  const checkIfScrolledToBottom = () => {
    const paperElement = document.querySelector('.chat-messages-paper');
    if (paperElement) {
      const { scrollHeight, scrollTop, clientHeight } = paperElement;
      const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50;
      setIsScrolledToBottom(isBottom);
    }
  };

  useEffect(() => {
    const paperElement = document.querySelector('.chat-messages-paper');
    if (paperElement) {
      paperElement.addEventListener('scroll', checkIfScrolledToBottom);
      checkIfScrolledToBottom();
    }
    return () => {
      const paperElement = document.querySelector('.chat-messages-paper');
      if (paperElement) {
        paperElement.removeEventListener('scroll', checkIfScrolledToBottom);
      }
    };
  }, []);

  useEffect(() => {
    if (isScrolledToBottom && messagesEndRef.current) {
      const paperElement = document.querySelector('.chat-messages-paper');
      if (paperElement) {
        paperElement.scrollTop = paperElement.scrollHeight;
      }
    }
  }, [messages, isScrolledToBottom]);

  // Mobil görünüm için drawer state'i
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  // Drawer içeriği
  const drawerContent = (
    <Box sx={{ 
      width: isMobile ? '100%' : 280, 
      height: '100%',
      borderRight: '1px solid',
      borderColor: theme.palette.divider,
      background: theme.palette.background.paper,
    }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Sohbet Odaları</Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        <ListItemButton
          selected={currentTab === 'global'}
          onClick={() => setCurrentTab('global')}
          sx={{
            borderRadius: 1,
            mx: 1,
            mb: 1
          }}
        >
          <ListItemIcon>
            <PublicIcon color={currentTab === 'global' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Global Chat" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        {rooms.map((room) => (
          <ListItemButton
            key={room.id}
            selected={currentTab === room.id}
            onClick={() => setCurrentTab(room.id)}
            sx={{
              borderRadius: 1,
              mx: 1,
              mb: 1
            }}
          >
            <ListItemIcon>
              <GroupIcon color={currentTab === room.id ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary={room.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  if (!isChatOpen) {
    return (
      <Badge 
        badgeContent={unreadCount} 
        color="error"
        sx={{
          position: 'fixed',
          bottom: isMobile ? 24 : 32,
          right: isMobile ? 24 : 32,
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
            boxShadow: '0 4px 8px rgba(33, 203, 243, .4)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
            }
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
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          height: isMobile ? '100vh' : '80vh',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          borderRadius: isMobile ? '0' : '20px',
          overflow: 'hidden',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Sol Panel - Mobilde Drawer, Masaüstünde sabit panel */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: 280,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          drawerContent
        )}

        {/* Sağ Panel - Chat Alanı */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #1976D2 0%, #1CB5E0 100%)',
            color: 'white',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              {isMobile && (
                <IconButton 
                  color="inherit" 
                  onClick={() => setDrawerOpen(true)}
                  size="small"
                >
                  <MenuIcon />
                </IconButton>
              )}
              {currentTab === 'global' ? (
                <PublicIcon sx={{ fontSize: 24 }} />
              ) : (
                <GroupIcon sx={{ fontSize: 24 }} />
              )}
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                letterSpacing: '0.5px',
                fontSize: isMobile ? '1.1rem' : '1.25rem'
              }}>
                {currentTab === 'global' ? 'Global Chat' : currentRoom?.name}
              </Typography>
            </Box>
            <IconButton 
              onClick={handleClose} 
              size="small" 
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            p: 2,
            gap: 2
          }}>
            <Paper 
              className="chat-messages-paper"
              elevation={0}
              sx={{ 
                flex: 1, 
                overflow: 'auto',
                backgroundColor: 'transparent',
                borderRadius: 2,
                p: 2
              }}
            >
              <MessageList 
                messages={filteredMessages} 
                username={username}
                messagesEndRef={messagesEndRef}
              />
            </Paper>

            <MessageInput
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onSend={handleSend}
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </DialogContent>
        </Box>
      </Box>

      <RoomMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        newRoomName={newRoomName}
        onNewRoomNameChange={(e) => setNewRoomName(e.target.value)}
        onCreateRoom={handleCreateRoom}
        onLeaveRoom={() => currentTab !== 'global' && handleLeaveRoom(currentTab)}
        isInRoom={currentTab !== 'global'}
      />
    </Dialog>
  );
};