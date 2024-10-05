const express = require('express');
const { getProfile, updateProfile } = require('../controllers/advertiserController');
const {getProducts, addProduct, editProduct} = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// require auth for all advertiser routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/products',getProducts);
router.post('/addProduct',addProduct);
router.patch('/editProduct/:id',editProduct);
module.exports = router;