const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const reviewList = new mongoose.Schema({
    smartphoneId_reviewed: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        required: true
    },
    review_date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    listReview: {
        type: [reviewList],
        default: []
    }
}, { versionKey: false })

userSchema.pre('save', function (next) {
    this.review_date = Date.now();
    next();
});

// static function for signup --> for standard user
userSchema.statics.signup = async function (name, surname, email, username, password) {

    // validation
    if (!name || !surname || !username || !password || !email) {
        throw Error('All fields must be filled')
    }

    // exist @, exists string before @, exists gmail, hotmail, etc, exist .com, .it, etc
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // min 8 characters, min 1 lower character, min 1 upper character, min 1 number, min 1 symbol
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username is already in use')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create user
    const user = await this.create({ name, surname, username, password: hash, email, isAdmin: false })
    console.log('signup', user)
    return user
}

// static function for login
userSchema.statics.login = async function (username, password) {

    // validation
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

// static function for change password
userSchema.statics.changePassword = async function (userLogged, newPassword) {

    // validation
    if (!newPassword) {
        throw Error('The field must be filled')
    }

    // min 8 characters, min 1 lower character, min 1 upper character, min 1 number, min 1 symbol
    if (!validator.isStrongPassword(newPassword)) {
        throw Error('Password not strong enough')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const update = { $set: { password: hash } };

    const user = await this.findOneAndUpdate({ username: userLogged.username }, update, { new: true });

    console.log('changePassword', user)

    return user
}

// static function for update user data
userSchema.statics.updateUserData = async function (name, surname, userLogged) {

    // validation
    if (!name || !surname || !userLogged.username) {
        throw Error('All fields must be filled')
    }

    const update = { $set: { name: name, surname: surname } };

    const user = await this.findOneAndUpdate({ username: userLogged.username }, update, { new: true });

    console.log('updateUserData', user)

    return user
}

module.exports = mongoose.model('User', userSchema)