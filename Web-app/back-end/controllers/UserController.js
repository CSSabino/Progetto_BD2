const express = require('express')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");

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
    const { username, password, email } = req.body

    try{
        const user = await User.signup(username, password, email)
        console.log('signupUser', user)
        const token = createToken(user._id)
        return res.status(200).json({user: user, token})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const reviewList = async (req, res) => {
    
}

module.exports = { loginUser, signupUser, reviewList}