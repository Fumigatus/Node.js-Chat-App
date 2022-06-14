const chatFrom = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

//parse the url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//join chatroom
socket.emit('joinRoom', { username, room })

//message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //scroll messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//get room and users info
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUserList(users);
})

//message submit
chatFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message
    const message = e.target.elements.msg.value;
    // console.log(message);

    //emit message to server
    socket.emit('chatMessage', message);

    // //clear inputs
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output message to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
    roomName.innerHTML = room;
}

function outputUserList(users) {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = user.username;
        userList.appendChild(li);
    });
}
