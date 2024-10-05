const express = require('express');

// controller functions
const { getProfile, updateProfile } = require('../controllers/tourGuideController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tour guide routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;