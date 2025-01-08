const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

app.use(helmet());
app.use(cors());
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

const io = require('socket.io')(http, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

class MessageStore {
  constructor(maxMessages = 300) {
    this.messages = new Map();
    this.globalMessages = [];
    this.maxMessages = maxMessages;
    this.storageDir = path.join(__dirname, 'storage');
    this.globalStorageFile = path.join(this.storageDir, 'global_messages.json');
    this.roomsStorageFile = path.join(this.storageDir, 'room_messages.json');
    
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
    
    this.loadMessages();
  }

  loadMessages() {
    try {
      if (fs.existsSync(this.globalStorageFile)) {
        this.globalMessages = JSON.parse(fs.readFileSync(this.globalStorageFile, 'utf8'));
      }

      if (fs.existsSync(this.roomsStorageFile)) {
        const roomMessages = JSON.parse(fs.readFileSync(this.roomsStorageFile, 'utf8'));
        this.messages = new Map(Object.entries(roomMessages));
      }
    } catch (error) {
      console.error('Mesajlar yüklenirken hata oluştu:', error);
    }
  }

  saveMessages() {
    try {
      fs.writeFileSync(this.globalStorageFile, JSON.stringify(this.globalMessages));

      const roomMessages = Object.fromEntries(this.messages);
      fs.writeFileSync(this.roomsStorageFile, JSON.stringify(roomMessages));
    } catch (error) {
      console.error('Mesajlar kaydedilirken hata oluştu:', error);
    }
  }

  addMessage(message, roomId = null) {
    if (roomId) {
      if (!this.messages.has(roomId)) {
        this.messages.set(roomId, []);
      }
      const roomMessages = this.messages.get(roomId);
      roomMessages.push(message);
      if (roomMessages.length > this.maxMessages) {
        this.messages.set(roomId, roomMessages.slice(-this.maxMessages));
      }
    } else {
      this.globalMessages.push(message);
      if (this.globalMessages.length > this.maxMessages) {
        this.globalMessages = this.globalMessages.slice(-this.maxMessages);
      }
    }
    
    this.saveMessages();
    return message;
  }

  getMessages(roomId = null) {
    return roomId ? (this.messages.get(roomId) || []) : this.globalMessages;
  }

  getRoomMessageCount(roomId) {
    if (!roomId) {
      return this.globalMessages.length;
    }
    const roomMessages = this.messages.get(roomId);
    return roomMessages ? roomMessages.length : 0;
  }

  clearOldMessages(roomId = null) {
    if (roomId) {
      const roomMessages = this.messages.get(roomId);
      if (roomMessages && roomMessages.length > this.maxMessages) {
        this.messages.set(roomId, roomMessages.slice(-this.maxMessages));
      }
    } else {
      if (this.globalMessages.length > this.maxMessages) {
        this.globalMessages = this.globalMessages.slice(-this.maxMessages);
      }
    }
    this.saveMessages();
  }
}

class RoomManager {
  constructor() {
    this.rooms = new Map(); 
    this.storageDir = path.join(__dirname, 'storage');
    this.roomsStorageFile = path.join(this.storageDir, 'rooms.json');
    
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
        this.loadRooms();
  }

  loadRooms() {
    try {
      if (fs.existsSync(this.roomsStorageFile)) {
        const savedRooms = JSON.parse(fs.readFileSync(this.roomsStorageFile, 'utf8'));
        savedRooms.forEach(room => {
          this.rooms.set(room.id, {
            name: room.name,
            members: new Set()
          });
        });
        console.log('Kayıtlı odalar yüklendi:', this.getAllRooms());
      }
    } catch (error) {
      console.error('Odalar yüklenirken hata oluştu:', error);
    }
  }

  saveRooms() {
    try {
      const roomsToSave = this.getAllRooms().map(room => ({
        id: room.id,
        name: room.name
      }));
      fs.writeFileSync(this.roomsStorageFile, JSON.stringify(roomsToSave, null, 2));
      console.log('Odalar kaydedildi');
    } catch (error) {
      console.error('Odalar kaydedilirken hata oluştu:', error);
    }
  }

  createRoom(roomId, roomName) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        name: roomName,
        members: new Set()
      });
      
      this.saveRooms();
      
      return {
        id: roomId,
        name: roomName,
        members: []
      };
    }
    return null;
  }

  deleteRoom(roomId) {
    if (this.rooms.has(roomId)) {
      this.rooms.delete(roomId);
      this.saveRooms();
      return true;
    }
    return false;
  }

  joinRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    
    room.members.add(socketId);
    return {
      id: roomId,
      name: room.name,
      members: Array.from(room.members)
    };
  }

  leaveRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.members.delete(socketId);
    }
  }

  getRoomInfo(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    return {
      id: roomId,
      name: room.name,
      members: Array.from(room.members)
    };
  }

  getAllRooms() {
    return Array.from(this.rooms.entries()).map(([id, room]) => ({
      id,
      name: room.name,
      members: Array.from(room.members)
    }));
  }

  getUserRooms(socketId) {
    return Array.from(this.rooms.entries())
      .filter(([_, room]) => room.members.has(socketId))
      .map(([id, room]) => ({
        id,
        name: room.name,
        members: Array.from(room.members)
      }));
  }
}

class UserStore {
  constructor() {
    this.users = new Map();
  }

  addUser(socketId, userData) {
    this.users.set(socketId, {
      ...userData,
      lastActive: Date.now()
    });
    return this.getUserCount();
  }

  removeUser(socketId) {
    this.users.delete(socketId);
    return this.getUserCount();
  }

  updateUser(socketId, updates) {
    if (this.users.has(socketId)) {
      this.users.set(socketId, {
        ...this.users.get(socketId),
        ...updates,
        lastActive: Date.now()
      });
    }
  }

  getUser(socketId) {
    return this.users.get(socketId);
  }

  getUserCount() {
    return this.users.size;
  }
}

const messageStore = new MessageStore();
const roomManager = new RoomManager();
const userStore = new UserStore();

io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı:', socket.id);

  let currentUser = null;

  socket.on('setUser', (userData) => {
    currentUser = userData;
    userStore.addUser(socket.id, {
      ...userData,
      connectionTime: new Date().toISOString()
    });
    io.emit('userCount', userStore.getUserCount());
    
    const rooms = roomManager.getAllRooms();
    console.log('Mevcut odalar:', rooms);
    socket.emit('roomList', rooms);
  });

  socket.on('createRoom', ({ roomId, roomName }) => {
    try {
      console.log('Oda oluşturma isteği:', { roomId, roomName, user: currentUser });
      const newRoom = roomManager.createRoom(roomId, roomName);
      
      if (newRoom) {
        const updatedRoom = roomManager.joinRoom(roomId, socket.id);
        socket.join(roomId);
        
        if (updatedRoom) {
          console.log('Oda başarıyla oluşturuldu:', updatedRoom);
          
          const allRooms = roomManager.getAllRooms();
          io.emit('roomList', allRooms);
          
          socket.emit('roomJoined', { roomId });
        }
      }
    } catch (error) {
      console.error('Oda oluşturma hatası:', error);
      socket.emit('error', 'Oda oluşturulamadı');
    }
  });

  socket.emit('roomList', roomManager.getAllRooms());

  socket.on('requestGlobalMessages', () => {
    socket.emit('previousMessages', messageStore.getMessages());
  });

  socket.on('requestRoomMessages', (roomId) => {
    try {
      console.log('Oda mesajları talep edildi:', roomId);
      const roomMessages = messageStore.getMessages(roomId);
      console.log('Gönderilen oda mesajları:', roomMessages);
      socket.emit('roomMessages', {
        roomId,
        messages: roomMessages
      });
    } catch (error) {
      console.error('Oda mesajları gönderme hatası:', error);
      socket.emit('error', 'Oda mesajları alınamadı');
    }
  });

  socket.on('globalMessage', (message) => {
    try {
      const enrichedMessage = {
        ...message,
        timestamp: Date.now(),
        socketId: socket.id,
        type: 'global'
      };
      
      messageStore.addMessage(enrichedMessage);
      io.emit('globalMessage', enrichedMessage);
      
    } catch (error) {
      console.error('Global mesaj işleme hatası:', error);
      socket.emit('error', 'Mesaj gönderilemedi');
    }
  });

  socket.on('joinRoom', (roomId) => {
    try {
      console.log('Odaya katılma isteği:', roomId, 'Kullanıcı:', currentUser);
      const roomInfo = roomManager.joinRoom(roomId, socket.id);
      if (roomInfo) {
        socket.join(roomId);
        
        const allRooms = roomManager.getAllRooms();
        io.emit('roomList', allRooms);
        
        socket.emit('roomJoined', { roomId });
        
        const roomMessages = messageStore.getMessages(roomId);
        socket.emit('roomMessages', {
          roomId,
          messages: roomMessages || []
        });
        
        socket.to(roomId).emit('userJoined', {
          roomId,
          user: currentUser?.username || 'Anonim'
        });
        
        console.log('Kullanıcı odaya katıldı:', { 
          roomId, 
          socketId: socket.id,
          username: currentUser?.username 
        });
      }
    } catch (error) {
      console.error('Odaya katılma hatası:', error);
      socket.emit('error', 'Odaya katılınamadı');
    }
  });

  socket.on('leaveRoom', (roomId) => {
    try {
      roomManager.leaveRoom(roomId, socket.id);
      socket.leave(roomId);
      
      io.emit('roomList', roomManager.getAllRooms());
    } catch (error) {
      console.error('Odadan ayrılma hatası:', error);
      socket.emit('error', 'Odadan ayrılınamadı');
    }
  });

  socket.on('roomMessage', ({ roomId, message }) => {
    try {
      console.log('Oda mesajı gönderiliyor:', { roomId, message, user: currentUser });
      
      const room = roomManager.getRoomInfo(roomId);
      if (!room || !room.members.includes(socket.id)) {
        console.log('Kullanıcı odada değil, otomatik katılım yapılıyor');
        roomManager.joinRoom(roomId, socket.id);
        socket.join(roomId);
      }
      
      const enrichedMessage = {
        ...message,
        timestamp: Date.now(),
        socketId: socket.id,
        roomId,
        type: 'room',
        user: currentUser?.username || message.user || 'Anonim'
      };
      
      messageStore.addMessage(enrichedMessage, roomId);
      io.to(roomId).emit('roomMessage', enrichedMessage);
      
      console.log('Oda mesajı gönderildi:', enrichedMessage);
    } catch (error) {
      console.error('Oda mesajı işleme hatası:', error);
      socket.emit('error', 'Mesaj gönderilemedi');
    }
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
    
    const userRooms = roomManager.getUserRooms(socket.id);
    userRooms.forEach(room => {
      roomManager.leaveRoom(room.id, socket.id);
    });
    
    io.emit('roomList', roomManager.getAllRooms());
    
    const userCount = userStore.removeUser(socket.id);
    io.emit('userCount', userCount);
  });

  socket.on('error', (error) => {
    console.error('Socket hatası:', error);
  });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

http.listen(PORT, HOST, () => {
  console.log(`Socket.IO sunucusu http://${HOST}:${PORT} adresinde çalışıyor`);
  console.log('Sunucu başlatma zamanı:', new Date().toISOString());
}).on('error', (error) => {
  console.error('Sunucu başlatma hatası:', error);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM sinyali alındı. Sunucu kapatılıyor...');
  http.close(() => {
    console.log('Sunucu kapatıldı');
    process.exit(0);
  });
});