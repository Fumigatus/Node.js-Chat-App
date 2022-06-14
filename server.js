const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { formatMessages } = require('./utils/messages');
const { getUser, userJoin, leaveUser, roomUser } = require('./utils/users');

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
        socket.broadcast.to(user.room).emit('message', formatMessages(botName, `${user.username} joined to chat`));

        //get room and users info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: roomUser(user.room),
        })
    });
    //listen for chat messages
    socket.on('chatMessage', msg => {
        const user = getUser(socket.id);
        console.log(msg);
        io.to(user.room).emit('message', formatMessages(user.username, msg));
    });

    //runs whem client disconnects
    socket.on('disconnect', () => {
        const user = leaveUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessages(botName, `${user.username} has left the chat`));

            //get room and users info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: roomUser(user.room),
            })
        }
    });
})

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.log(`listening port: ${PORT}`);
})
