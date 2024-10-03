const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addTourGov
} = require("../controllers/adminController")

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

// Add Tourism Governer
router.post("/governer", addTourGov)

module.exports = router