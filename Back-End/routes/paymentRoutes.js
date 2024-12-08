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
router.post('/handleBookingPayment', requireAuth(), handleBookingPayment);

// Route to mark booking as paid
router.post('/markBookingAsPaid', requireAuth(), markBookingAsPaid);

// Route to pay order with wallet
router.post('/payOrderWithWallet', requireAuth(), payOrderWithWallet);

// Route to pay order with Stripe
router.post('/payOrderWithStripe', requireAuth(), payOrderWithStripe);

// Route to mark order as paid
router.post('/markOrderAsPaid', requireAuth(), markOrderAsPaid);

// Route to pay order with cash on delivery
router.post('/payOrderCashOnDelivery', requireAuth(), payOrderCashOnDelivery);

// Route to get payment multiplier
router.get('/getPaymentMultiplier', requireAuth(), getPaymentMultiplier);

module.exports = router;