const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Menyajikan file di folder 'public'
app.use(express.static('public'));

// Setup signaling dengan Socket.IO
io.on('connection', (socket) => {
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });
});

// Memulai server pada port 5000
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});