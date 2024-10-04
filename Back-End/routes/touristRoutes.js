const express = require('express');

// controller functions
const{getAvailableProducts} = require('../controllers/adminController')
const { getProfile, updateProfile } = require('../controllers/touristController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tourist routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/availableProducts',getAvailableProducts)

module.exports = router;