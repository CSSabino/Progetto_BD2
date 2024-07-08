const express = require('express')
const router = express.Router()

const { changePassword, updateUserData } = require('../controllers/UserController')
const requireAuthUser = require('../middleware/requireAuthUser')


router.use(requireAuthUser)

// changePassword route
router.post('/changePassword', changePassword)

// updateUserData route
router.post('/updateUserData', updateUserData)

module.exports = router