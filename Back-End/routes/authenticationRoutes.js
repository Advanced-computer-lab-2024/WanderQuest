const express = require('express');

// controller functions
const { registerUser, changePassword } = require('../controllers/authenticationController');

const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/changePassword/:id', changePassword);

module.exports = router;