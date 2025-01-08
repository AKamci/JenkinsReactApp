import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Message, Room } from './types';
import { saveMessagesToStorage, saveRoomsToStorage } from './utils';

interface UseSocketProps {
  username: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

export const useSocket = ({
  username,
  setMessages,
  setRooms,
  setCurrentTab
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_CHAT_SERVER_URL);
    
    socketRef.current.on('connect', () => {
      console.log('Sohbete bağlanıldı!');
      
      socketRef.current?.emit('setUser', {
        username,
        fullName: username
      });
    });

    socketRef.current.on('globalMessage', (message: Message) => {
      setMessages(prev => {
        if (prev.some(m => m.id === message.id)) {
          return prev;
        }
        const newMessages = [...prev, message];
        saveMessagesToStorage(newMessages);
        return newMessages;
      });
    });

    socketRef.current.on('roomMessage', (message: Message) => {
      console.log('Oda mesajı alındı:', message);
      setMessages(prev => {
        if (prev.some(m => m.id === message.id)) {
          return prev;
        }
        const newMessages = [...prev, message];
        saveMessagesToStorage(newMessages);
        return newMessages;
      });
    });

    socketRef.current.on('roomMessages', ({ roomId, messages: roomMessages }: { roomId: string, messages: Message[] }) => {
      console.log('Oda mesajları alındı:', { roomId, messages: roomMessages });
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.roomId !== roomId);
        const newMessages = [...filteredMessages, ...roomMessages].sort((a, b) => a.timestamp - b.timestamp);
        saveMessagesToStorage(newMessages);
        return newMessages;
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
        const sortedMessages = newMessages.sort((a, b) => Number(a.id) - Number(b.id));
        saveMessagesToStorage(sortedMessages);
        return sortedMessages;
      });
    });

    socketRef.current.on('roomList', (updatedRooms: Room[]) => {
      console.log('Oda listesi güncellendi:', updatedRooms);
      setRooms(updatedRooms);
      saveRoomsToStorage(updatedRooms);
    });

    socketRef.current.on('roomJoined', ({ roomId }: { roomId: string }) => {
      console.log('Odaya katılındı:', roomId);
      setCurrentTab(roomId);
    });

    socketRef.current.on('error', (error: string) => {
      console.error('Socket hatası:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [username, setMessages, setRooms, setCurrentTab]);

  return socketRef;
}; 