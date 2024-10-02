const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addPlace,
    getAllPlaces,
    updatePlace,
    deletePlace,
    createTag,
    getAllTags,
    addProduct,
    editProduct,
    getProducts
} = require("../controllers/adminController")

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)
//Admin getProducts
router.get("/products",getProducts)
//Admin addProduct
router.post("/addProduct",addProduct)
//Admin editProduct
router.patch("/editProduct/:id",editProduct)
//Add tourism governer




//Get Places
router.get("/tourismGovernor/places",getAllPlaces)
//Tourism Governor create Place
router.post("/tourismGovernor/addPlace",addPlace)
//Tourism Governor update Place
router.patch("/tourismGovernor/updatePlace/:id",updatePlace)
//Tourism Governor delete Place
router.delete("/tourismGovernor/deletePlace/:id",deletePlace)
//Tourism Governor create Tag
router.post("/tourismGovernor/addTag",createTag)
//Tourism Governor get Tags
router.get("/tourismGovernor/tags",getAllTags)
module.exports = router