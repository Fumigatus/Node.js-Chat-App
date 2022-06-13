const users = [];

//join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

//get current user
function getUser(id) {
    return users.find(user => user.id);
}

module.exports = {
    userJoin,
    getUser,
}