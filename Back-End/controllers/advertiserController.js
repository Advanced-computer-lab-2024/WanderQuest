const Advertiser = require('../models/userModel').Advertiser;

// functions
const getProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user.id);
        res.json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedAdvertiser = await Advertiser.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedAdvertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProfile, updateProfile };