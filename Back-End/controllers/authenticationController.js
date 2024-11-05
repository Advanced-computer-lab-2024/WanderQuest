const User = require('../models/userModel').User;
const Tourist = require('../models/userModel').Tourist;
const TourGuide = require('../models/userModel').TourGuide;
const Advertiser = require('../models/userModel').Advertiser;
const Seller = require('../models/userModel').Seller;
const Admin = require('../models/adminModel');
const TourGoverner = require('../models/tourGovernerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.json({ role: user.role, email: user.email, id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// change password using the old password
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        let user = await User.findById(req.params.id);

        if (!user) {
            user = await Admin.findById(req.params.id);
        }

        if (!user) {
            user = await TourGoverner.findById(req.params.id);
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordCorrect) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, changePassword };