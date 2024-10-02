const express = require('express');

// controller functions
const { } = require('../controllers/tourGuideController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tour guide routes
router.use(requireAuth);

// routes

module.exports = router;