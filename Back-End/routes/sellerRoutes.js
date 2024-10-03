const express = require('express');
const { getProfile, updateProfile } = require('../controllers/advertiserController');
const requireAuth = require('../middleware/requireAuth');


const router = express.Router();

// require auth for all advertiser routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;