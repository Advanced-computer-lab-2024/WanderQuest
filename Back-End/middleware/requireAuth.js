const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const User = require('../models/userModel').User;
const TourGov = require('../models/tourGovernerModel');

const requireAuth = (config = {}) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({ error: 'You are not logged in' });
        }

        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            const extractedID = decodedToken._id._id;

            if (err) {
                res.json({ message: "You are not logged in." })
            } else {
                console.log('Token verified, user ID:', extractedID);

                // Select both _id and role from the database
                req.user = await User.findById(extractedID).select('_id role');
                if (!req.user) {
                    req.user = await Admin.findById(extractedID).select('_id role');
                }
                if (!req.user) {
                    req.user = await TourGov.findById(extractedID).select('_id role');
                }
                if (!req.user) {
                    return res.json({ error: 'User not found' });
                }

                // Check if the user has the required role
                if (config.role && req.user.role !== config.role) {
                    return res.status(403).json({ error: 'Forbidden: Insufficient role permission' });
                }
                next();
            }
        });
    };
};

module.exports = requireAuth;