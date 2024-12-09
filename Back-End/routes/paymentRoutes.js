const express = require('express');
const {
    handleBookingPayment,
    markBookingAsPaid,
    payOrderWithWallet,
    payOrderWithStripe,
    markOrderAsPaid,
    payOrderCashOnDelivery,
    getPaymentMultiplier
} = require('../controllers/paymentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Route to handle booking payment
router.post('/handleBookingPayment', requireAuth({ role: 'tourist' }), handleBookingPayment);

// Route to mark booking as paid
router.post('/markBookingAsPaid', requireAuth({ role: 'tourist' }), markBookingAsPaid);

// Route to pay order with wallet
router.post('/payOrderWithWallet', requireAuth({ role: 'tourist' }), payOrderWithWallet);

// Route to pay order with Stripe
router.post('/payOrderWithStripe', requireAuth({ role: 'tourist' }), payOrderWithStripe);

// Route to mark order as paid
router.post('/markOrderAsPaid', requireAuth({ role: 'tourist' }), markOrderAsPaid);

// Route to pay order with cash on delivery
router.post('/payOrderCashOnDelivery', requireAuth({ role: 'tourist' }), payOrderCashOnDelivery);

// Route to get payment multiplier
router.get('/getPaymentMultiplier', requireAuth(), getPaymentMultiplier);

module.exports = router;