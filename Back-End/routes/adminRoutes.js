const express = require('express')
const {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addTourGov,
    addProduct,
    editProduct,
    getProducts,
    getAvailableProducts,
    getCategories,
    editCategory,
    addCategory,
    deleteCategory
} = require("../controllers/adminController");

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

// Add Tourism Governer
router.post("/governor", addTourGov)

//Admin getProducts
router.get("/products",getProducts)

//Admin getAvailableProducts
router.get('/availableProducts',getAvailableProducts)

//Admin addProduct
router.post("/addProduct",addProduct)

//Admin editProduct
router.patch("/editProduct/:id",editProduct)

//Admin addActivityCategory
router.post('/addCategory',addCategory)

//Admin getCategories
router.get('/categories',getCategories)

//Admin editCategory
router.patch('/editCategory/:id',editCategory)

//Admin deleteCategory
router.delete('/deleteCategory/:id',deleteCategory)

module.exports = router