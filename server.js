const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { formatMessages } = require('./utils/messages');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);
const botName = 'Chat App';

//runs when client connects
io.on('connection', socket => {
    // console.log('Hello World');

    //emit single user
    socket.emit('message', formatMessages(botName, 'Welcome to Chat App'));

    //emit everyone except the connected user
    socket.broadcast.emit('message', formatMessages(botName, 'New user joined to chat'));

    //emit everyone
    // io.emit();

    //join chatroom
    socket.on('joinRoom',)

    //listen for chat messages
    socket.on('chatMessage', msg => {
        console.log(msg);
        io.emit('message', msg);
    });

    //runs whem client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessages(botName, 'A user has left the chat'));
    });
})

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log(`listening port: ${PORT}`);
})