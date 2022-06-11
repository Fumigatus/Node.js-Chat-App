const chatFrom = document.getElementById('chat-form');

const socket = io();

//message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

})

//message submit
chatFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message
    const message = e.target.elements.msg.value;
    // console.log(message);

    //emit message to server
    socket.emit('chatMessage', message);
})

//output message to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}