const users = [];

//join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

//get current user
function getUser(id) {
    return users.find(user => user.id === id);
}

//remove user to leave
function leaveUser(id) {
    const index = users.find(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//get user list from room
function roomUser(room) {
    const userList = users.filter(user=>user.room===room);
    return userList;
}

module.exports = {
    userJoin,
    getUser,
    leaveUser,
    roomUser,
}