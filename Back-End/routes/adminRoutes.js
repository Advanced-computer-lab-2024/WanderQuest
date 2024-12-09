const express = require('express')
const multer = require('multer');
const upload = multer();
const requireAuth = require('../middleware/requireAuth');
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
    reply,
    archiveProduct,
    unarchiveProduct,
    viewProductSales,
    viewAllProductSales,
    flagActivity,
    flagItinerary,
    viewSalesReport,
    createPromo,
    promocodes,
    deletePromocode,
    getProductPhoto,
    seenNotifications,
    myNotifications,
    getUserStatstics
} = require("../controllers/adminController");

const router = express.Router()


//Admin getCategories
router.get('/categories', getCategories)

router.use(requireAuth({ role: 'Admin' }));

// Get all admins d
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

//Admin viewProduct Sales D
router.get('/products/sales/:id', viewProductSales)

// Admin view all product sales d
router.get('/sales', viewAllProductSales);

// Route to add a product d
router.post('/addProduct', addProduct);

// Route to edit a product d
router.patch('/editProduct/:id', editProduct);

// Route to get a product photo d
router.get('/productPhoto/:id', getProductPhoto);

//Admin addActivityCategory d
router.post('/addCategory', addCategory)

//Admin getCategories d
router.get('/categories', getCategories)

//Admin editCategory d
router.patch('/editCategory/:id', editCategory)

//Admin deleteCategory d
router.delete('/deleteCategory/:id', deleteCategory)

//Admin getTags d
router.get('/tags', getAllTags)

//Admin createTag d
router.post('/addTag', createTag)

//Admin updateTag d
router.patch('/editTag/:id', updateTag)

//Admin deleteTag d
router.delete('/deleteTag/:id', deleteTag)

//Admin getComplaints d
router.get('/complaints', getAllComplaints)

//Admin getSpecificComplaint d
router.get('/complaints/:id', specificComplaint)

//Admin markComplaint d
router.patch('/markComplaint/:id', markComplaint)

//Admin reply d
router.patch('/reply/:id', reply)

//Admin archive a product d
router.patch('/products/archive/:id', archiveProduct);
//Admin unarchive a product d
router.patch('/products/unarchive/:id', unarchiveProduct);

//flag an activity d
router.patch('/flagActivity/:id', flagActivity);
//flag an itinerary d
router.patch('/flagItinerary/:id', flagItinerary);

//view sales report d
router.get('/salesReport', viewSalesReport);
//d
router.get('/userStats', getUserStatstics);


//Create Promocode d
router.post('/promo', createPromo);
//promocodes d
router.get('/promocodes', promocodes);
//d
router.delete('/promocodes/:id', deletePromocode)
//d
router.get('/notifs', myNotifications);
//notifications d
router.patch('/notifs', seenNotifications);
//Admin filterByStatus
module.exports = router