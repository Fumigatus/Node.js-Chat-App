const moment = require('moment')

function formatMessages(username, text) {
    return {
        username,
        text,
        time: moment().format('ddd H:mm')
    }
}

module.exports = {
    formatMessages,
}