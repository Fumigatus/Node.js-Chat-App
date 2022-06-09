const chatFrom=document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
})

chatFrom.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get message
    const message=e.target.elements.msg.value;
    // console.log(message);

    //emit message to server
    socket.emit('chatMessage',message);
})