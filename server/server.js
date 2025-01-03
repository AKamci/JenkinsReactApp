const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
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
const messageStore = {
  messages: [],
  maxMessages: 150,
  addMessage(message) {
    this.messages.push(message);
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(-this.maxMessages);
    }
    return message;
  },
  getMessages() {
    return this.messages;
  }
};
const userStore = {
  users: new Map(),
  addUser(socketId, userData) {
    this.users.set(socketId, { ...userData, lastActive: Date.now() });
    return this.getUserCount();
  },
  removeUser(socketId) {
    this.users.delete(socketId);
    return this.getUserCount();
  },
  getUserCount() {
    return this.users.size;
  }
};

io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı:', socket.id);
  
  const userCount = userStore.addUser(socket.id, {
    connectionTime: new Date().toISOString()
  });
  io.emit('userCount', userCount);

  socket.on('requestMessages', () => {
    socket.emit('previousMessages', messageStore.getMessages());
  });

  socket.on('message', (message) => {
    try {
      const enrichedMessage = {
        ...message,
        timestamp: Date.now(),
        socketId: socket.id
      };
      
      messageStore.addMessage(enrichedMessage);
      io.emit('message', enrichedMessage);
      
    } catch (error) {
      console.error('Mesaj işleme hatası:', error);
      socket.emit('error', 'Mesaj gönderilemedi');
    }
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
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