const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient')
const verify = require('./lib/verifyToken')
const { patientValidation } = require('./validation/patientValidation')
const { respondWithError, respondWithData, respondWithMessage } = require('./lib/respond')

router.post('/', verify, async (req, res) => {

    // Validate
    const { error } = patientValidation(req.body)
    if (error) return res.status(400).send(respondWithError(error.details[0].message))

    const patient = new Patient({
        mrn: req.body.mrn,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        contactNo: req.body.contactNo,
        email: req.body.email,
        address: {
            one: req.body.address.one,
            two: req.body.address.two,
            postcode: req.body.address.postcode,
            state: req.body.address.state
        },
        nextOfKin: {
            firstName: req.body.nextOfKin.firstName,
            lastName: req.body.nextOfKin.lastName,
            contactNo: req.body.nextOfKin.contactNo,
            email: req.body.nextOfKin.email
        },
    })
    try {
        const savedPatient = await patient.save()
        const message = 'Profile retrieved'
        res.json(respondWithData(message, savedPatient))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }

});

// Specific post
router.get('/', verify, async (req, res) => {
    try {
        const patients = await Patients.find();
        res.json(patients)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;
