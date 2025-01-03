const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
let messages = [];
let users = [];
io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı:', socket.id);
  users.push(socket.id);
  io.emit('userCount', users.length);
  socket.on('requestMessages', () => {
    socket.emit('previousMessages', messages);
  });
  socket.on('message', (message) => {
    messages.push(message);
    if (messages.length > 150) {
      messages = messages.slice(-150);
    }
    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
    users = users.filter(user => user !== socket.id);
    io.emit('userCount', users.length);
  });
});
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'asds';

console.log(PORT, HOST);

http.listen(PORT, HOST, () => {
  console.log(`Socket.IO sunucusu http://${HOST}:${PORT} adresinde çalışıyor`);
}); 