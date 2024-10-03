const TourGuide = require('../models/userModel').TourGuide;

// functions
const getProfile = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.user.id);
        res.json(tourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedTourGuide = await TourGuide.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedTourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProfile, updateProfile };