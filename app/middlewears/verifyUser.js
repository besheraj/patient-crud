const Patient = require('../models/Patient')
const {authResponseMessages} = require('../responseMessages/auth') 
const { respondWithError  } = require('../lib/respond')

module.exports = async function (req,res,next) {
    const patient = await Patient.findById(req.params.patientId).populate('authId');
    if (patient.authId._id != req.user._id) return res.status(400).send(respondWithError(authResponseMessages.accessDenied))
    next()
}


