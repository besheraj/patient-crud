const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient')
const verify = require('./lib/verifyToken')
const { patientValidation, updatedPatientValidation } = require('./validation/patientValidation')
const { respondWithError, respondWithData, respondWithMessage } = require('./lib/respond')
const {patientResponseMessages} = require('./responseMessages/patient') 

// add patient profile
router.post('/', verify, async (req, res) => {

    // Validate
    const { error } = patientValidation(req.body)
    if (error) return res.status(400).send(respondWithError(error.details[0].message))

    // Email exists
    const emailExists = await Patient.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send(respondWithError(responseMessages.patientExists))

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
        const message = responseMessages.added
        res.json(respondWithData(message, savedPatient))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }

});

// index
router.get('/', verify, async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients.length > 0) {
            const message = responseMessages.allProfiles
            res.json(respondWithData(message, patients))
        }
        else {
            const message = responseMessages.noData
            res.json(respondWithData(message, patients))
        }
        res.json(respondWithData(message, patients))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }
});

// Specific patient
router.get('/:patientId', verify, async (req, res) => {
    try {
        const id = req.params.patientId
        const patient = await Patient.findById(id);
        const message = responseMessages.revived
        res.json(respondWithData(message, patient))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }
});

// Update Patient
router.put('/:patientId', verify, async (req, res) => {

    // Validate
    const { error } = updatedPatientValidation(req.body)
    if (error) return res.status(400).send(respondWithError(error.details[0].message))

    try {
        const entries = Object.keys(req.body)
        const updates =  {isActive:true}
        // constructing dynamic query

        for (let i = 0; i < entries.length; i++) {
            updates[entries[i]] = Object.values(req.body)[i]
        }
        const id = req.params.patientId
        const updatePatient = await Patient.updateOne(
            { _id: id },
            {
                $set:updates
            })
        const message = responseMessages.updated
        const patient = await Patient.findById(id);
        res.json(respondWithData(message, patient))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }
});


// Delete Patient
router.delete('/:patientId', verify, async (req, res) => {
    try {
        const id = req.params.patientId
        await Patient.remove({ _id: id });
        const message = responseMessages.deleted
        res.json(respondWithMessage(message))
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }
});


module.exports = router;
