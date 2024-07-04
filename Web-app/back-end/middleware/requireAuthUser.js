const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuthUser = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        user = await User.findOne({_id})
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({error: error.message})
    }
}

module.exports = requireAuthUser