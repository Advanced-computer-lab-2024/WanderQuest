const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const User = require('../models/userModel').User; // Assuming you have a User model
const { sendEmail  } = require('../controllers/authenticationController');

// // Helper function to convert currency
// async function convertCurrency(amount, fromCurrency, toCurrency) {
//     // Fetch exchange rates
//     const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`);
//     const rate = response.data.conversion_rates[toCurrency];
//     return amount * rate;
// }

async function handlePayment(req, res) {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let amountToPay = amount;

        // Check if the user is a tourist and has sufficient funds in their wallet
        if (user.wallet > 0) {
            let walletAmountInPreferredCurrency = user.wallet;

            // // Convert wallet amount to the preferred currency if needed
            // if (user.preferredCurrency !== currency) {
            //     walletAmountInPreferredCurrency = await convertCurrency(user.wallet, user.preferredCurrency, currency);
            // }

            if (walletAmountInPreferredCurrency >= amount) {
                // Deduct the amount from the wallet
                user.wallet -= amount;
                await user.save();
                await sendEmail(user.email,"Payment Made",`Your payment of ${amount} ${user.preferredCurrency} was successful`);
                return res.status(200).json({ message: 'Payment successful using wallet.' });
            } else {
                // Deduct the wallet amount from the total amount to pay
                amountToPay -= walletAmountInPreferredCurrency;
                user.wallet = 0;
            }
        }

        console.log(amountToPay);

        // Create a payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountToPay,
            currency: user.preferredCurrency,
        });


        await user.save();
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
}

module.exports = {
    handlePayment,
};