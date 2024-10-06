const Tourist = require('../models/userModel').Tourist;
const PlaceModel = require('../models/objectModel').Places;
const ActivityModel = require('../models/objectModel').Activity;
const ItineraryModel = require('../models/objectModel').itinerary;

// functions
const getProfile = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }
        res.json(tourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        // Remove dob and username from req.body to prevent updates
        const { dob, username, ...updateData } = req.body;

        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUpcomingActivities = async (req, res) => {
    try {
        const currentDate = new Date();
        const activities = await ActivityModel.find({ date: { $gt: currentDate } });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUpcomingItineraries = async (req, res) => {
    try {
        const currentDate = new Date();
        const itineraries = await ItineraryModel.find({
            availableDates: { $elemMatch: { $gt: currentDate } }
        });
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
module.exports = { getProfile, updateProfile, getAvailableProducts, getUpcomingActivities, getUpcomingItineraries };