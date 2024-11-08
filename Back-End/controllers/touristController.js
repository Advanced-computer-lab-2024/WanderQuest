const { TourGuide } = require('../models/userModel');
const ProdModel = require('../models/objectModel').Product;
const Tourist = require('../models/userModel').Tourist;
const PlaceModel = require('../models/objectModel').Places;
const ActivityModel = require('../models/objectModel').Activity;
const ItineraryModel = require('../models/objectModel').itinerary;
const ComplaintModel = require('../models/objectModel').complaint;

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

// get the first tourist id
const getTouristId = async (req, res) => {
    try {
        const tourist = await Tourist.findOne({});
        res.json(tourist._id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUpcomingActivities = async (req, res) => {
    try {
        const currentDate = new Date();
        const activities = await ActivityModel.find({ date: { $gt: currentDate } });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getActivityById = async (req, res) => {
    try {
        const activity = await ActivityModel.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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

const getItineraryById = async (req, res) => {
    try {
        const itinerary = await ItineraryModel.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(itinerary);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 } }, { availableAmount: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//change preferred currency
const changePreferredCurrency = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        const updatedTourist = await Tourist.findByIdAndUpdate(req.params.id, { preferredCurrency: req.body.preferredCurrency }, { new: true });
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const redeemPoints = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }
        if (tourist.availablePoints > 10000) {
            tourist.wallet += 100;
            tourist.availablePoints -= 10000;
            await tourist.save();

            return res.status(200).json({ message: 'Wallet increased by 100', wallet: tourist.wallet });
        } else {
            return res.status(400).json({ error: 'Not enough points' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
const fileComplaint = async(req,res)=>{
    const {title,body,status,date,reply,createdBy} = req.body;
    if (!title || !body ) {
        return res.status(400).json({ error: 'Title and Body fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingComplaint = await ComplaintModel.findOne({ title,body });
        if (existingComplaint) {
            return res.status(400).json({ error: 'Complaint already exists' });
        }
        const complaint = await ComplaintModel.create({title,body,status,date,reply,createdBy})
        res.status(200).json(complaint)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const myComplaints = async (req, res) => {
    try {
        if (req.params.id) {
            const complaints = await ComplaintModel.find({ createdBy: req.params.id });
            res.status(200).json(complaints);
        } else {
            res.status(400).json({ error: 'UserID is required' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//rate an activity
const rateAnActivity = async (req,res) => {

    try{
        const activityId  = req.params.id;
        const { touristId, rating} = req.body;
        // Check if touristId and rating are provided
        // Debugging log to see if values are correctly parsed
        console.log("Received activityId:", activityId);
        console.log("Received touristId:", touristId);
        console.log("Received rating:", rating);

        if (!touristId || !rating) {
            return res.status(400).json({ message: "touristId and rating are required" });
        }
        if(rating < 1 || rating > 5){
            return res.status(400).json({error: ' Rating must be between 1 and 5'});
        }

        const activity = await ActivityModel.findById(activityId);
        if(!activity){
            return res.status(404).json({error: 'Activity not found'});
        }
        
        const existingRating = activity.ratings.findIndex(r => r.touristId.toString() === touristId);
        if(existingRating !== -1){
            activity.ratings[existingRating].rating = rating;
        }else{
            activity.ratings.push({ touristId, rating});
        }

        const totalRatings = activity.ratings.reduce((acc, r) => acc + r.rating, 0);
        activity.rating = totalRatings / activity.ratings.length;
        await activity.save();
        return res.status(200).json({ message: "Activity rated successfully", activity });
    }catch(error){
        return res.status(500).json({error: error.message });

    }
}

//rate a product
const rateProduct = async (req,res) =>{
    try{
    const { productId } = req.params;
    const {  rating} = req.body;

    // if(!touristId ){
    //     return res.status(400).json({error: 'touristId is required'});
    // }
    if(!rating ){
        return res.status(400).json({error: 'rating is required'});
    }
    // if (!touristId || rating === undefined) {
    //     return res.status(400).json({ error: 'touristId and rating are required' });
    // }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'rating should be between 1 and 5' });
    }
    const product = await ProdModel.findById(productId);
    if(!product){
        return res.status(400).json({error: 'Product not found'});
    }
    // const existingRating  = product.ratings.findIndex(r => r.touristId.toString() === touristId)
    // if (existingRatingIndex !== -1) {
    //     // Update the existing rating
    //     product.ratings[existingRatingIndex].rating = rating;
    // }
    product.ratings.push(rating);
    const totalRatings = product.ratings.reduce((acc, r) => acc + r, 0);
    product.rating = totalRatings / product.ratings.length;

    await product.save();
    return res.status(200).json({ message: 'Product rated successfully', product });
    }catch(error){
        res.status(400).json({error: error.message});
    }

};
//review a product that is purchased
const reviewProduct = async (req,res) => {
    try{
      const { productId } = req.params;
      
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
module.exports = {
    getProfile,
    updateProfile,
    getTouristId,
    getAvailableProducts,
    getUpcomingActivities,
    getActivityById,
    getItineraryById,
    getUpcomingItineraries,
    changePreferredCurrency,
    redeemPoints,
    fileComplaint,
    myComplaints,
    rateAnActivity,
    rateProduct,
    reviewProduct
};