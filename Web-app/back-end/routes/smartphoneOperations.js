const express = require('express')
const router = express.Router()

const {
    getAllSmartphone,
    getSmartphoneById,
    filterSearchAndSortSmartphones,
    addReviewToSmartphone
} = require("../controllers/SmartphoneController");

const requireAuthUser = require("../middleware/requireAuthUser");

// ALL SMARTPHONE
router.get('/', getAllSmartphone)

// SINGLE SMARTPHONE
router.get('/id/:id', getSmartphoneById)

// QUERY
router.post('/filter', filterSearchAndSortSmartphones)

// ADD REVIEW
router.post('/addReview', requireAuthUser, addReviewToSmartphone)

module.exports = router