const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('chat message', 'A user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('chat message', 'A user disconnected');
    });
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log('message: ' + msg);
    });

    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', username);
      });
    
      socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing');
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});