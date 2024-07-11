const express = require('express')
const router = express.Router()

const { changePassword, updateUserData, reviewList, addReviewToList } = require('../controllers/UserController')
const requireAuthUser = require('../middleware/requireAuthUser')


router.use(requireAuthUser)

// changePassword route
router.post('/changePassword', changePassword)

// updateUserData route
router.post('/updateUserData', updateUserData)

// addReviewToList route
router.post('/addReviewToList', addReviewToList)

// getListReviews route
router.post('/getListReviews', reviewList)

module.exports = router