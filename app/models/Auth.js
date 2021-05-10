const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    password_confirmation: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Auth', authSchema)