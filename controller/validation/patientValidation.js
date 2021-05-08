const Joi = require('joi');

//Validation 
const patientValidation = data => {
    const schema = Joi.object({
        mrn: Joi.string().max(10).required(),
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().max(30).required(),
        dob: Joi.string().max(14).required(),
        gender: Joi.string().max(2).required(),
        contactNo: Joi.number().required(),
        email: Joi.string().max(30).required().email(),
        address: {
            one: Joi.string().max(255).required(),
            two: Joi.string().max(255).required(),
            postcode: Joi.number().required(),
            state: Joi.string().max(20).required()
        },
        nextOfKin: {
            firstName: Joi.string().max(30).required(),
            lastName: Joi.string().max(30).required(),
            contactNo: Joi.number().required(),
            email: Joi.string().allow(''),
        },
    })
    return schema.validate(data)
}

module.exports.patientValidation = patientValidation;
