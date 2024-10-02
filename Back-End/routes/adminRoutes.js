const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addPlace,
    getAllPlaces,
    createTag,
    getAllTags
} = require("../controllers/adminController")

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

//Add tourism governer




//Get Places
router.get("/tourismGovernor/places",getAllPlaces)
//Tourism Governor create Place
router.post("/tourismGovernor/addPlace",addPlace)
//Tourism Governor create Tag
router.post("/tourismGovernor/addTag",createTag)
//Tourism Governor get Tags
router.get("/tourismGovernor/tags",getAllTags)
module.exports = router