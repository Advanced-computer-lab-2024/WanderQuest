const express = require('express');

// controller functions
const { getAvailableProducts } = require('../controllers/adminController')
const { getProfile, updateProfile,getUpcoming } = require('../controllers/touristController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// // require auth for all tourist routes
// router.use(requireAuth({ role: 'tourist' }));

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/availableProducts', getAvailableProducts);
router.get('/upcoming',getUpcoming);

module.exports = router;