const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    one: {
        type: String,
        required: true,
    },
    two: {
        type: String,
        required: true,
    },
    postcode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
})


const nextOFKinSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    }
},{ _id : false })

const patientsSchema = mongoose.Schema({
    mrn: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: [addressSchema],
    nextOfKin: [nextOFKinSchema],
    isActive: {
        type: String,
        default: 'true'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
},{ versionKey: false })
module.exports = mongoose.model('Patient', patientsSchema)