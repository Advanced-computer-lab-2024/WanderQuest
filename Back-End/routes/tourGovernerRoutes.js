const express = require('express')
const {
    addPlace,
    getAllPlaces,
    getPlaceById,
    updatePlace,
    deletePlace,
    createTag,
    getAllTags,
    myCreatedPlaces
} = require("../controllers/tourGovernerController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

//Get Places
router.get("/places", getAllPlaces)
//Get Place by ID
router.get("/places/:id", getPlaceById)
//Get my Places
router.get("/myPlaces", requireAuth({ role: 'Tourism Governor' }), myCreatedPlaces)

//Tourism Governor create Place
router.post("/addPlace", requireAuth({ role: 'Tourism Governor' }), addPlace)

//Tourism Governor update Place
router.patch("/updatePlace/:id", updatePlace)

//Tourism Governor delete Place
router.delete("/deletePlace/:id", requireAuth({ role: 'Tourism Governor' }), deletePlace)

//Tourism Governor create Tag
router.post("/addTag", createTag)

//Tourism Governor get Tags
router.get("/tags", getAllTags)

module.exports = router