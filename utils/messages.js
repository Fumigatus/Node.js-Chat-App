const moment = require('moment')

function formatMessages(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm')
    }
}

module.exports = {
    formatMessages,
}