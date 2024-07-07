const express = require('express')
const router = express.Router()

const { changePassword } = require('../controllers/UserController')
const requireAuthUser = require('../middleware/requireAuthUser')


router.use(requireAuthUser)

// changePassword route
router.post('/changePassword', changePassword)

module.exports = router