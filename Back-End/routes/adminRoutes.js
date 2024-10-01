const express = require('express')
const {
    getAllAdmins,
    addAdmin
} = require("../controllers/AdminController")

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system

// Add another admin
router.post("/", addAdmin)

//Add tourism governer

module.exports = router