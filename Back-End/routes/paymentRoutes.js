const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { handleBookingPayment, markBookingAsPaid } = require('../controllers/paymentController');

const router = express.Router();

// routes
router.post('/payBooking', requireAuth({ role: 'tourist' }), handleBookingPayment);
router.post('/markBookingAsPaid', requireAuth({ role: 'tourist' }), markBookingAsPaid);

module.exports = router;