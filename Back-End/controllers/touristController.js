const Tourist = require('../models/userModel').Tourist;
const PlaceModel = require('../models/objectModel').Places;
const ActivityModel = require('../models/objectModel').Activity;
const ItineraryModel = require('../models/objectModel').itinerary;

// functions
const getProfile = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        res.json(tourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getUpcoming = async (req,res)=>{
    try {
        const currentDate = new Date();
        const places = await PlaceModel.find({});
        const activities = await ActivityModel.find({date:{$gt:currentDate}});
        const itineraries = await ItineraryModel.find({
            availableDates: { $elemMatch: { $gt: currentDate } }
        });
        res.status(200).json({places,activities,itineraries});
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
module.exports = { getProfile, updateProfile,getAvailableProducts,getUpcoming };