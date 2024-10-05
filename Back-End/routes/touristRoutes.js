const express = require('express');

// controller functions
const { getAvailableProducts } = require('../controllers/adminController')
const { getProfile, updateProfile } = require('../controllers/touristController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// // require auth for all tourist routes
// router.use(requireAuth({ role: 'tourist' }));

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/availableProducts', getAvailableProducts)

module.exports = router;