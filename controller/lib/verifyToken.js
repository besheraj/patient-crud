const jwt = require('jsonwebtoken')
const BlacklistenToken = require('../../models/BlacklistedTokens')
const {authResponseMessages} = require('../responseMessages/auth') 

module.exports = async function (req,res,next) {
    const token = req.header('access_token');
    if(!token) return res.status(401).send(authResponseMessages.accessDenied)
    const canceledTokens = await BlacklistenToken.findOne({ token: token })
    if(canceledTokens) return res.status(401).send(authResponseMessages.invalidToken)

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).send(authResponseMessages.invalidToken)
    }
}

