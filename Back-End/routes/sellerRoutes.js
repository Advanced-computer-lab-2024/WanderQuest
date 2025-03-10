const express = require('express');
const { getProfile, updateProfile, uploadLogo,myProducts, getLogo, archiveProduct,unarchiveProduct,viewProductSales,viewAllProductSales,viewSalesReport,seenNotifications,myNotifications } = require('../controllers/sellerController');
const { getProducts, addProduct, editProduct, getAvailableProducts, getProdById, getProductPhoto } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// require auth for all advertiser routes
// router.use(requireAuth);

// routes
//Change these routes when we apply the authentication
router.get('/profile', requireAuth({role: "seller"}), getProfile);
router.put('/profile', requireAuth({role: "seller"}), updateProfile);
router.post('/uploadLogo', requireAuth({role: "seller"}), uploadLogo);
router.get('/logo', requireAuth({role: "seller"}), getLogo);
router.get('/myProducts' ,requireAuth({role: "seller"}),myProducts)
router.get('/products', getProducts);
//Seller viewProduct Sales
router.get('/products/sales',viewProductSales)

// seller view all product sales
router.get('/sales', viewAllProductSales);

router.get("/products/:id", getProdById);

// Route to add a product
router.post('/addProduct', requireAuth({ role: "seller" }), addProduct);

// Route to edit a product
router.patch('/editProduct/:id', requireAuth({ role: "seller" }), editProduct);

// Route to get a product photo
router.get('/productPhoto/:id', requireAuth({ role: "seller" }), getProductPhoto);

router.get('/availableProducts', getAvailableProducts)
//seller archive and unarchive products
router.patch('/archiveProduct/:id', archiveProduct);

router.patch('/unarchiveProduct/:id', unarchiveProduct);

router.get('/salesReport',requireAuth({role: "seller"}),viewSalesReport);
router.get('/notifs',requireAuth({role: "seller"}), myNotifications);
router.patch('/notifs',requireAuth({role: "seller"}), seenNotifications);

module.exports = router;