const jwt = require('jsonwebtoken');
const User = require('../models/userModel').User;

const requireAuth = (config = {}) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];

        try {
            const { _id } = jwt.verify(token, process.env.SECRET);
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
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({ error: 'Request is not authorized' });
        }
    };
};

module.exports = requireAuth;