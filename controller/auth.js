const express = require('express')
const router = express.Router()
const Auth = require('../models/Auth')
const BlacklistenToken = require('../models/BlacklistedTokens')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation/authValidation')
const { respondWithError, respondWithData, respondWithMessage } = require('./lib/respond')
const {authResponseMessages} = require('./responseMessages/auth') 


router.post('/register', async (req, res) => {

    // Validate
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(respondWithError(error.details[0].message))

    // Email exists
    const emailExists = await Auth.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send(respondWithError(authResponseMessages.emailExists))

    // validate password confirmation
    if (req.body.password != req.body.password_confirmation)
        return res.status(400).send(respondWithError(authResponseMessages.passwordNotMatch))

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const hashPasswordConfirmation = await bcrypt.hash(req.body.password_confirmation, salt)

    // Create New User
    const user = new Auth({
        email: req.body.email,
        password: hashPassword,
        password_confirmation: hashPasswordConfirmation
    })
    try {
        const savedUser = await user.save();

        // Create Token 
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, { expiresIn: '2h' })
        const decoded = jwt.decode(token)

        const message = authResponseMessages.registerSuccessful
        const data = {
            email: savedUser.email,
            id: savedUser._id,
            access_token: token,
            expiresIn: decoded.exp
        }

        res.send(respondWithData(message,data))
        
    } catch (err) {
        res.status(400).send(respondWithError(err))
    }
})

// Login
router.post('/login', async (req, res) => {

    // Validate
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(respondWithError(error.details[0].message))

    // Email exists
    const user = await Auth.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(respondWithError(authResponseMessages.loginNotMatch))

    // If Password & Email is a match
    const validatePass = await bcrypt.compare(req.body.password, user.password)
    if (!validatePass) return res.status(400).send(respondWithError(authResponseMessages.loginNotMatch))

    // Create Token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    // res.header({token}).send({message: 'login Successful'})
    const decoded = jwt.decode(token)
    const message = authResponseMessages.loginSuccessful
    const data = {
        email: user.email,
        id: user._id,
        access_token: token,
        expiresIn: decoded.exp
    }
    res.send(respondWithData(message,data))
})

router.post('/logout', async (req,res) => {

    // token logged out already
    const canceledTokens = await BlacklistenToken.findOne({ token: req.body.access_token });
    if (canceledTokens) return res.status(400).send(respondWithError(authResponseMessages.alreadyLoggedout))

    const blackListedToken = new BlacklistenToken({
        token: req.body.access_token
    })

    try {
        await blackListedToken.save()
        res.send(respondWithMessage(authResponseMessages.logoutSuccessful))
    }catch(err) {
        res.status(400).send(respondWithError(err))
    }
    
})

module.exports = router;
