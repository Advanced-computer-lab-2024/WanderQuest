const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin
} = require("../controllers/adminController")

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

//Add tourism governer

module.exports = router