const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const User = require('../models/userModel').User;
const Order = require('../models/objectModel').Order;
const Booking = require('../models/bookingModel');

// Helper function to convert currency
async function convertCurrency(amount, fromCurrency, toCurrency) {
    // Fetch exchange rates
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`);
    const rate = response.data.conversion_rates[toCurrency];
    return amount * rate;
}

const getPaymentMultiplier = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const preferredCurrency = user.preferredCurrency;

        // Fetch exchange rates
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`);
        const rates = response.data.conversion_rates;

        if (!rates[preferredCurrency]) {
            return res.status(400).json({ message: 'Unsupported currency.' });
        }

        const multiplier = rates[preferredCurrency];

        res.status(200).json({ multiplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the exchange rate.' });
    }
}

const handleBookingPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (booking.paid) {
            return res.status(400).json({ message: 'Booking has already been paid for.' });
        }

        const usdPrice = booking.details.price;

        // Convert the price to the user's preferred currency
        let amount = usdPrice;
        if (user.preferredCurrency !== 'USD') {
            amount = await convertCurrency(usdPrice, 'USD', user.preferredCurrency);
        }

        // Check if the user is a tourist and has sufficient funds in their wallet
        if (user.wallet > 0) {
            let walletAmountInPreferredCurrency = user.wallet;

            if (walletAmountInPreferredCurrency >= amount) {
                // Deduct the amount from the wallet
                user.wallet -= amount;
                await user.save();

                return res.status(200).json({ message: 'Payment successful using wallet.' });
            } else {
                // Deduct the wallet amount from the total amount to pay
                amount -= walletAmountInPreferredCurrency;
                user.wallet = 0;
            }
        }

        // Create a payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: user.preferredCurrency,
        });


        await user.save();
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}

const markBookingAsPaid = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.paid = true;
        await booking.save();

        res.status(200).json({ message: 'Booking marked as paid.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while marking the booking as paid.' });
    }

}

const payOrderWithWallet = async (req, res) => {
    try {
        const { orderId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Order has already been paid for.' });
        }

        const usdPrice = order.totalPrice;

        // Convert the price to the user's preferred currency
        let amount = usdPrice;
        if (user.preferredCurrency !== 'USD') {
            amount = await convertCurrency(usdPrice, 'USD', user.preferredCurrency);
        }

        // Check if the user is a tourist and has sufficient funds in their wallet
        if (user.wallet >= amount) {
            // Deduct the amount from the wallet
            user.wallet -= amount;
            await user.save();

            order.paymentStatus = 'paid';
            await order.save();

            return res.status(200).json({ message: 'Payment successful using wallet.' });
        }

        res.status(400).json({ message: 'Insufficient funds in wallet.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}

const payOrderWithStripe = async (req, res) => {
    try {
        const { orderId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Order has already been paid for.' });
        }

        const usdPrice = order.totalPrice;

        // Convert the price to the user's preferred currency
        let amount = usdPrice;
        if (user.preferredCurrency !== 'USD') {
            amount = await convertCurrency(usdPrice, 'USD', user.preferredCurrency);
        }

        // Create a payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: user.preferredCurrency,
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}

const payOrderCashOnDelivery = async (req, res) => {
    try {
        const { orderId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Order has already been paid for.' });
        }

        order.paymentStatus = 'cod';

        await order.save();

        res.status(200).json({ message: 'Order marked as cash on delivery.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}

module.exports = {
    handleBookingPayment,
    markBookingAsPaid,
    payOrderWithWallet,
    payOrderWithStripe,
    payOrderCashOnDelivery,
    getPaymentMultiplier,
};