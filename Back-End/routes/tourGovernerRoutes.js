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

const router = express.Router()

//Get Places
router.get("/places",getAllPlaces)
//Get Place by ID
router.get("/places/:id",getPlaceById)
//Get my Places
router.get("/myPlaces",myCreatedPlaces)

//Tourism Governor create Place
router.post("/addPlace",addPlace)

//Tourism Governor update Place
router.patch("/updatePlace/:id",updatePlace)

//Tourism Governor delete Place
router.delete("/deletePlace/:id",deletePlace)

//Tourism Governor create Tag
router.post("/addTag",createTag)

//Tourism Governor get Tags
router.get("/tags",getAllTags)

module.exports = router