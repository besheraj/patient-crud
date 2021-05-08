const jwt = require('jsonwebtoken')
const BlacklistenToken = require('../../models/BlacklistedTokens')

module.exports = async function (req,res,next) {
    const token = req.header('access_token');
    if(!token) return res.status(401).send('Access Denied')
    const canceledTokens = await BlacklistenToken.findOne({ token: token })
    if(canceledTokens) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).send('invalid token')
    }
}

