const express = require('express')
const router = express.Router()
const Patients = require('../models/Patients')
const verify = require('./lib/verifyToken')

router.post('/', verify, async (req, res) => {
    const patient = new Patients({
        name: req.body.name,
    })
    try {
        const savedPatient = await patient.save()
        res.json(savedPatient)
    } catch (err) {
        res.json({ message: err })
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
