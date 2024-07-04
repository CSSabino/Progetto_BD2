const express = require('express')

const router = express.Router()

const {
    insertSmartphone,
    deleteSmartphoneById,
    updateSmartphoneById
} = require("../controllers/SmartphoneController")

// middleware
//const requireAuthAdmin = require('../middleware/requireAuthAdmin')
//router.use(requireAuthAdmin)

// if authentication has success

// INSERT A SINGLE SMARTPHONE
router.post('/', insertSmartphone)

// DELETE A SINGLE SMARTPHONE
router.delete('/:id', deleteSmartphoneById)

// UPDATE A SINGLE SMARTPHONE
router.patch('/:id', updateSmartphoneById)

module.exports = router