const express = require('express')
const multer = require('multer');
const upload = multer();
const {
    getAllAdmins,
    getUsers,
    deleteAccount,
    addAdmin,
    addTourGov,
    addProduct,
    editProduct,
    getProducts,
    getProdById,
    getAvailableProducts,
    getCategories,
    editCategory,
    addCategory,
    deleteCategory,
    createTag,
    getAllTags,
    updateTag,
    deleteTag,
    getAllComplaints,
    specificComplaint,
    markComplaint,
    reply
} = require("../controllers/adminController");

const router = express.Router()

// Get all admins
router.get("/", getAllAdmins)
// Get all users
router.get("/users", getUsers)

// Delete account off system
router.delete("/delete/:id", deleteAccount)

// Add another admin
router.post("/", addAdmin)

// Add Tourism Governor
router.post("/governor", addTourGov)

//Admin getProducts
router.get("/products", getProducts)

//Admin getProductByID
router.get("/products/:id", getProdById)

//Admin getAvailableProducts
router.get('/availableProducts', getAvailableProducts)

//Admin addProduct
router.post('/addProduct', upload.single('picture'), addProduct);

// Use multer middleware to handle file upload
router.patch('/editProduct/:id', upload.single('picture'), editProduct);

//Admin addActivityCategory
router.post('/addCategory', addCategory)

//Admin getCategories
router.get('/categories', getCategories)

//Admin editCategory
router.patch('/editCategory/:id', editCategory)

//Admin deleteCategory
router.delete('/deleteCategory/:id', deleteCategory)

//Admin getTags
router.get('/tags', getAllTags)

//Admin createTag
router.post('/addTag', createTag)

//Admin updateTag
router.patch('/editTag/:id', updateTag)

//Admin deleteTag
router.delete('/deleteTag/:id', deleteTag)

//Admin getComplaints
router.get('/complaints',getAllComplaints)

//Admin getSpecificComplaint
router.get('/complaints/:id',specificComplaint)

//Admin markComplaint
router.patch('/markComplaint/:id',markComplaint)

//Admin reply
router.patch('/reply/:id',reply)
//Admin filterByStatus
module.exports = router