const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addTourGov,
    addProduct,
    editProduct,
    getProducts,
    getAvailableProducts
} = require("../controllers/adminController");

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

// Add Tourism Governer
router.post("/governer", addTourGov)

//Admin getProducts
router.get("/products",getProducts)

//Admin getAvailableProducts
router.get('/availableProducts',getAvailableProducts)

//Admin addProduct
router.post("/addProduct",addProduct)

//Admin editProduct
router.patch("/editProduct/:id",editProduct)

module.exports = router