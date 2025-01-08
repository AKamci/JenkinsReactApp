export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
  type: 'global' | 'room';
  roomId?: string;
}

export interface Room {
  id: string;
  name: string;
  members: string[];
}

export interface RoomMembersEvent {
  roomId: string;
  members: string[];
}

export interface RoomJoinedEvent {
  roomId: string;
}

export const STORAGE_KEY = 'jenkins_chat_messages';
export const LAST_READ_KEY = 'jenkins_chat_last_read';
export const ROOMS_STORAGE_KEY = 'jenkins_chat_rooms'; 