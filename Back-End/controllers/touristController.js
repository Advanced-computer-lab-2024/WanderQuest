const Tourist = require('../models/userModel').Tourist;

// functions
const getProfile = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user.id);
        res.json(tourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 } }, { availableAmount: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { getProfile, updateProfile,getAvailableProducts };