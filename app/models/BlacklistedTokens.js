const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('BlacklistenToken', tokenSchema)