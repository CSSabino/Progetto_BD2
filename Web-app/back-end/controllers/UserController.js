const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// create token
const createToken = (_id) => {
    return jwt.sign( {_id}, process.env.SECRET_KEY, { expiresIn: '24h'})
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.login(username, password)
        const token = createToken(user._id)
        return res.status(200).json({user, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { name, surname, email, username, password } = req.body

    try{
        const user = await User.signup(name, surname, email, username, password)
        console.log('signupUser', user)
        const token = createToken(user._id)
        return res.status(200).json({user: user, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const changePassword = async (req, res) => {
    const { newPassword} = req.body;

    try{
        const user = await User.changePassword(req.user, newPassword)
        console.log('changePassword', user)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const updateUserData = async (req, res) => {
    const { name, surname } = req.body

    try{
        const user = await User.updateUserData(name, surname, req.user);
        console.log('updateUserData', user)
        return res.status(200).json({user: user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const reviewList = async (req, res) => {
    
}

module.exports = { loginUser, signupUser, reviewList, changePassword, updateUserData}