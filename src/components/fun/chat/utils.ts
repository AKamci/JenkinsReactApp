import { Message, Room, STORAGE_KEY, LAST_READ_KEY, ROOMS_STORAGE_KEY } from './types';
import birthdays from '../../../data/birthdays.json';

export const loadMessagesFromStorage = (): Message[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveMessagesToStorage = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const loadRoomsFromStorage = (): Room[] => {
  const stored = localStorage.getItem(ROOMS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveRoomsToStorage = (rooms: Room[]) => {
  localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
};

export const getLastReadTime = (): number => {
  return Number(localStorage.getItem(LAST_READ_KEY)) || 0;
};

export const setLastReadTime = (time: number) => {
  localStorage.setItem(LAST_READ_KEY, time.toString());
};

export const isBirthday = (username: string): boolean => {
  const today = new Date();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = today.getDate().toString().padStart(2, '0');
  const currentDate = `${currentMonth}-${currentDay}`;
  
  return birthdays.birthdays.some(
    birthday => birthday.name === username && birthday.date === currentDate
  );
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}; 