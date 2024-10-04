const User = require('../models/userModel');
const Tourist = require('../models/userModel').Tourist;
const TourGuide = require('../models/userModel').TourGuide;
const Advertiser = require('../models/userModel').Advertiser;
const Seller = require('../models/userModel').Seller;
const jwt = require('jsonwebtoken');


// Create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the role is valid and create a new user
        let user;
        switch (role) {
            case 'tourist':
                user = await Tourist.signup(username, email, password, role, req.body.nationality, req.body.mobileNumber, req.body.dob, req.body.job);
                break;
            case 'tourGuide':
                user = await TourGuide.signup(username, email, password, role);
                break;
            case 'advertiser':
                user = await Advertiser.signup(username, email, password, role);
                break;
            case 'seller':
                user = await Seller.signup(username, email, password, role);
                break;
            default:
                return res.status(400).json({ error: 'Invalid role' });
        }

        // Create a token
        const token = createToken({ _id: user._id });

        res.json({ role: user.role, email: user.email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { registerUser };