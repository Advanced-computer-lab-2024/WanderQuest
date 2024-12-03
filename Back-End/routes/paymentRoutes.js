const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { handlePayment } = require('../controllers/paymentController');

const router = express.Router();

// routes
router.post('/pay', requireAuth({ role: 'tourist' }), handlePayment);

module.exports = router;