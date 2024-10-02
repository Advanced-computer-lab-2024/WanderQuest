const express = require('express');

// controller functions
const { } = require('../controllers/advertiserController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all advertiser routes
router.use(requireAuth);

// routes

module.exports = router;