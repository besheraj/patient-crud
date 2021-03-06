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
}, { _id: false })

const patientsSchema = mongoose.Schema({
    authId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
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
        type: Boolean,
        default: false
    }
},
    {
        timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }, versionKey: false

    }
)

module.exports = mongoose.model('Patient', patientsSchema)

