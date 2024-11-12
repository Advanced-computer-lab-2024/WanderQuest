const express = require('express');
const { getProfile, updateProfile, uploadLogo, getLogo, getSellerId,archiveProduct,unarchiveProduct,viewProductSales,viewAllProductSales,uploadProductPhoto,getProductPhoto } = require('../controllers/sellerController');
const { getProducts, addProduct, editProduct, getAvailableProducts, getProdById } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// require auth for all advertiser routes
// router.use(requireAuth);

// routes
//Change these routes when we apply the authentication
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.post('/uploadLogo/:id', uploadLogo);
router.get('/logo/:id', getLogo);
router.get('/sellerId', getSellerId);

router.get('/products', getProducts);
//Seller viewProduct Sales
router.get('products/sales',viewProductSales)

// seller view all product sales
router.get('/sales', viewAllProductSales);

router.get('/photo/:id', getProductPhoto);
router.get("/products/:id", getProdById);
// router.post('/uploadProductPhoto', ensureGridFSInitialized,uploadProductPhoto);
router.post('/uploadProductPhoto/:id', uploadProductPhoto);

router.post('/addProduct', addProduct);
router.patch('/editProduct/:id', editProduct);
router.get('/availableProducts', getAvailableProducts)
//seller archive and unarchive products
router.patch('/archiveProduct/:id', archiveProduct);

router.patch('/unarchiveProduct/:id', unarchiveProduct);

module.exports = router;