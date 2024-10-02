const express = require('express');

// controller functions
const { registerUser } = require('../controllers/registerationController');

const router = express.Router();

// routes
router.post('/', registerUser);

module.exports = router;