const { Seller } = require('../models/userModel');

// Read Seller profile
const getProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.id);
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Seller profile
const updateProfile = async (req, res) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedSeller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getProfile, updateProfile };