const express = require('express');
const { getProfile, updateProfile } = require('../controllers/sellerController');
const { getProducts, addProduct, editProduct, getAvailableProducts, getProdById } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// require auth for all advertiser routes
// router.use(requireAuth);

// routes
//Change these routes when we apply the authentication
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

router.get('/products', getProducts);

router.get("/products/:id", getProdById);
router.post('/addProduct', addProduct);
router.patch('/editProduct/:id', editProduct);
router.get('/availableProducts', getAvailableProducts)

module.exports = router;