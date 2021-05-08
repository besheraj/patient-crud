const mongoose = require('mongoose');

const patientsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Patients', patientsSchema)