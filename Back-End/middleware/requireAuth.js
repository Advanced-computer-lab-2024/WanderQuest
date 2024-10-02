const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { autherization } = req.headers;

    if (!autherization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = autherization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Request is not autherized' });
    }
}