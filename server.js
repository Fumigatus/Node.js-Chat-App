const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { formatMessages } = require('./utils/messages');
const { getUser, userJoin } = require('./utils/users');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketio(server);
const botName = 'Chat App';

//runs when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //emit single user
        socket.emit('message', formatMessages(botName, `${username} welcome to Chat App`));


        //emit everyone
        // io.emit();

        //join chatroom
        //emit everyone except the connected user
        socket.broadcast.to(user.room).emit('message', formatMessages(botName, `${username} joined to chat`));
    });
    //listen for chat messages
    socket.on('chatMessage', msg => {
        console.log(msg);
        io.emit('message', formatMessages('username', msg));
    });

    //runs whem client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessages(botName, `A user has left the chat`));
    });
})

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log(`listening port: ${PORT}`);
})