const jwt = require('jsonwebtoken');
const User = require('../models/userModel').User;

const requireAuth = (config = {}) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'You are not logged in' });
        }


        const { _id } = jwt.verify(token, process.env.SECRET);
        jwt.verify(token, process.env.SECRET, async (err, _id) => {
            if (err) {
                res.status(401).json({ message: "You are not logged in." })
            } else {
                console.log('Token verified, user ID:', _id);

                // Select both _id and role from the database
                req.user = await User.findById(_id).select('_id role');
                if (!req.user) {
                    return res.status(401).json({ error: 'User not found' });
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

module.exports = { requireAuth };