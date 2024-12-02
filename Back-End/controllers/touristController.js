const { Product } = require('../models/objectModel');
const { TourGuide } = require('../models/userModel');
const ProdModel = require('../models/objectModel').Product;
const Tourist = require('../models/userModel').Tourist;
const PlaceModel = require('../models/objectModel').Places;
const ActivityModel = require('../models/objectModel').Activity;
const ItineraryModel = require('../models/objectModel').itinerary;
const ComplaintModel = require('../models/objectModel').complaint;
const orderModel = require('../models/objectModel').Order;
const axios = require('axios');

// functions
const getProfile = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);
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
        const tourist = await Tourist.findById(req.user._id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        // Remove dob and username from req.body to prevent updates
        const { dob, username, ...updateData } = req.body;

        const updatedTourist = await Tourist.findByIdAndUpdate(req.user._id, updateData, { new: true });
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getUpcomingActivities = async (req, res) => {
    try {
        const currentDate = new Date();
        const activities = await ActivityModel.find({ date: { $gt: currentDate }, flagged: false });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getActivityById = async (req, res) => {
    try {
        const activity = await ActivityModel.findById(req.params.id);
        if (!activity || activity.flagged) {
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
            availableDates: { $elemMatch: { $gt: currentDate } }, flagged: false
        });
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getItineraryById = async (req, res) => {
    try {
        const itinerary = await ItineraryModel.findById(req.params.id);
        if (!itinerary || itinerary.flagged) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(itinerary);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 }, isArchived: false }, { availableAmount: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllCurrencies = async (req, res) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/codes`);
        if (!response) {
            return res.status(404).json({ error: 'Error fetching currencies' });
        }
        res.status(200).json(response.data.supported_codes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const changePreferredCurrency = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);

        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }

        const newCurrency = req.body.preferredCurrency;
        const oldCurrency = tourist.preferredCurrency;

        // Fetch exchange rates
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${oldCurrency}`);
        const rates = response.data.conversion_rates;

        if (!rates[newCurrency]) {
            return res.status(400).json({ error: 'Unsupported currency' });
        }

        // Convert wallet amount
        const conversionRate = rates[newCurrency];
        const newWalletAmount = tourist.wallet * conversionRate;

        // Update tourist's preferred currency and wallet amount
        tourist.preferredCurrency = newCurrency;
        tourist.wallet = newWalletAmount;

        const updatedTourist = await tourist.save();
        res.json(updatedTourist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getavailablePoints = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        res.status(200).json({ availablePoints: tourist.availablePoints });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getTotalPoints = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        res.status(200).json({ totalPoints: tourist.totalPoints });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getLevel = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }

        res.status(200).json({ level: tourist.level });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const redeemPoints = async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.user._id);
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }
        if (!tourist.accepted) {
            return res.status(403).json({ error: 'Tourist account not yet accepted' });
        }
        if (tourist.availablePoints >= 10000) {
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
const fileComplaint = async (req, res) => {
    const createdBy = req.user._id;
    const { title, body, status, date, reply } = req.body;
    if (!title || !body) {
        return res.status(400).json({ error: 'Title and Body fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingComplaint = await ComplaintModel.findOne({ title, body });
        if (existingComplaint) {
            return res.status(400).json({ error: 'Complaint already exists' });
        }
        const complaint = await ComplaintModel.create({ title, body, status, date, reply, createdBy })
        res.status(200).json(complaint)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const myComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintModel.find({ createdBy: req.user._id });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//rate an activity
const rateAnActivity = async (req, res) => {

    try {
        const activityId = req.params.id;
        const { rating } = req.body;
        const touristId = req.user._id;
        // Check if touristId and rating are provided
        // Debugging log to see if values are correctly parsed
        console.log("Received activityId:", activityId);
        console.log("Received touristId:", touristId);
        console.log("Received rating:", rating);

        if (!touristId || !rating) {
            return res.status(400).json({ message: "touristId and rating are required" });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: ' Rating must be between 1 and 5' });
        }

        const activity = await ActivityModel.findById(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const existingRating = activity.ratings.findIndex(r => r.touristId === touristId);
        if (existingRating !== -1) {
            activity.ratings[existingRating].rating = rating;
        } else {
            activity.ratings.push({ touristId, rating });
        }

        const totalRatings = activity.ratings.reduce((acc, r) => acc + r.rating, 0);
        activity.rating = totalRatings / activity.ratings.length;
        await activity.save();
        return res.status(200).json({ message: "Activity rated successfully", activity });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
//comment an activity
const commentOnActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        const { comment } = req.body;
        const touristId = req.user._id;
        if (!touristId) {
            return res.status(400).json({ error: 'touristId is required' });
        }
        if (!comment) {
            return res.status(400).json({ error: 'comment is required' });

        }
        if (!touristId || !comment) {
            return res.status(400).json({ message: "touristId and comment are required" });
        }
        const activity = await ActivityModel.findById(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        activity.comments.push({ touristId, comment });
        await activity.save();
        return res.status(200).json({ message: 'Comment added successfully', activity });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//rate a product
// const rateProduct = async (req, res) => {
//     try {
//         const  id = req.params.id;
//         const {touristId, rating } = req.body;

//         // if(!touristId ){
//         //     return res.status(400).json({error: 'touristId is required'});
//         // }
//         if (!rating) {
//             return res.status(400).json({ error: 'rating is required' });
//         }
//         if (!touristId || rating === undefined) {
//             return res.status(400).json({ error: 'touristId and rating are required' });
//         }
//         if (rating < 1 || rating > 5) {
//             return res.status(400).json({ error: 'rating should be between 1 and 5' });
//         }
//         console.log(id);
//         const product = await ProdModel.findById(id);
//         if (!product) {
//             return res.status(400).json({ error: 'Product not found' });
//         }
//         const existingRating  = product.ratings.findIndex(r => r.touristId === touristId)
//         if (existingRating !== -1) {
//             // Update the existing rating
//             product.ratings[existingRating].rating = rating;
//         }else{
//             product.ratings.push({ touristId, rating });
//         }
//         const totalRatings = product.ratings.reduce((acc, r) => acc + r, 0);
//         product.rating = totalRatings / product.ratings.length;

//         await product.save();
//         return res.status(200).json({ message: 'Product rated successfully', product });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }

// };
const rateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const touristId = req.user._id;
        const { rating } = req.body;

        if (!rating) {
            return res.status(400).json({ error: 'Rating is required' });
        }
        if (!touristId || rating === undefined) {
            return res.status(400).json({ error: 'TouristId and rating are required' });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating should be between 1 and 5' });
        }

        const product = await ProdModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the tourist has already rated the product
        const existingRatingIndex = product.ratings.findIndex(r => r.touristId.toString() === touristId);
        if (existingRatingIndex !== -1) {
            // Update the existing rating
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            // Add a new rating
            product.ratings.push({ touristId, rating });
        }

        // Calculate the new average rating
        const totalRatings = product.ratings.reduce((acc, r) => acc + r.rating, 0); // Fix: sum only the 'rating' field
        product.rating = totalRatings / product.ratings.length;

        await product.save();
        return res.status(200).json({ message: 'Product rated successfully', product });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

//review a product that is purchased
const reviewProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const touristId = req.user._id;
        const { review } = req.body;
        if (!review) {
            return res.status(400).json({ error: 'Review is required' });
        }
        if (!touristId) {
            return res.status(400).json({ error: 'Tourist id is required' });
        }
        const product = await ProdModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Add the review object to the reviews array
        product.reviews.push({ touristId, review });
        await product.save();
        return res.status(200).json({ message: 'Review added successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const saveEvent = async (req, res) => {
    const touristId = req.user._id;
    const {eventType, eventId} = req.body;
    if(!eventType || !eventId){
        return res.status(400).json({ error: 'Missing event type or id'})
    }
    if(eventType != "Activity" && eventType != "itinerary"){
        return res.status(400).json({ error: 'Event must be an activity or itinerary'})
    }
    try{
        const touristProf = await Tourist.findById(touristId);
        if(!touristProf){
            return res.status(400).json({ error: 'Could not find tourist with this ID'})
        }
        touristProf.savedEvents.push({eventType, eventId})
        await touristProf.save();
        return res.status(200).json({ message: 'Event saved successfully' });
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const viewSavedEvents = async (req, res) => {
    const touristId = req.user._id;
    try {
        const touristProf = await Tourist.findById(touristId);
        if(!touristProf){
            return res.status(404).json({error: 'Could not find the tourist'})
        }
        return res.status(200).json(touristProf.savedEvents);
    } catch(error){
        return res.status(500).json({ error: error.message})
    }
}

const removeSavedEvents = async (req, res) => {
    const touristId = req.user._id;
    const { eventId } = req.body;

    try {
        if (!eventId) {
            return res.status(400).json({ error: 'Missing event ID' });
        }

        const touristProf = await Tourist.findById(touristId);

        touristProf.savedEvents = touristProf.savedEvents.filter(event => !event.eventId.equals(eventId));
        await touristProf.save();

        res.status(200).json({ message: 'Event removed successfully', savedEvents: touristProf.savedEvents });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addToWishlist = async (req, res) => {
    const touristId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Missing product ID' });
    }

    try {
        // Find the product by ID
        const productDet = await Product.findById(productId);
        if (!productDet) {
            return res.status(400).json({ error: 'Could not find the product' });
        }

        // Find the tourist profile by ID
        const touristProf = await Tourist.findById(touristId);
        if (!touristProf) {
            return res.status(404).json({ error: 'Tourist not found' });
        }

        // Check if the product is already in the wishlist
        if (touristProf.wishlist.includes(productId)) {
            return res.status(400).json({ error: 'Product already in wishlist' });
        }

        // Add the product to the wishlist
        touristProf.wishlist.push(productId);
        await touristProf.save();

        return res.status(200).json({ message: 'Added to wishlist', wishlist: touristProf.wishlist });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const viewWishlist = async (req, res) => {
    const touristId = req.user._id;
    try {
        const touristProf = await Tourist.findById(touristId);
        if(!touristProf){
            return res.status(404).json({error: 'Could not find the tourist'})
        }
        const wishlistProducts = await Product.find({ _id: { $in: touristProf.wishlist } });

        return res.status(200).json(wishlistProducts);
    } catch(error){
        return res.status(500).json({ error: error.message})
    }
}

const removeFromWishlist = async (req, res) => {
    const touristId = req.user._id;
    const { productId } = req.body;

    try {
        if (!productId) {
            return res.status(400).json({ error: 'Missing product ID' });
        }

        const touristProf = await Tourist.findById(touristId);

        touristProf.wishlist = touristProf.wishlist.filter(product => !product.equals(productId));
        await touristProf.save();

        res.status(200).json({ message: 'Event removed successfully', wishlist: touristProf.wishlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const issueAnOrder = async (req, res) => {
    const touristId = req.user._id;
    const { products } = req.body;

    if (!products) {
        return res.status(400).json({ error: 'No products ordered' });
    }

    try {
        let totalPrice = 0;
        for(const product of products){
            const productDet = await Product.findById(product.productId);
            if(!productDet){
                return res.status(404).json({ error: 'Could not find product with ID: ' + product.productId });
            }
            if(productDet.availableAmount < product.quantity){
                return res.status(400).json({ error: 'Not enough stock for product: ' + productDet.name });
            }
            totalPrice += productDet.price * product.quantity;
        }
        const order = await orderModel.create({ orderedBy: touristId, products: products, totalPrice: totalPrice, date: new Date(), status: 'pending'});
        return res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const viewOrders = async (req, res) => {
    const touristId = req.user._id;
    try {
        const orders = await orderModel.find({ orderedBy: touristId });
        if(!orders){
            return res.status(404).json({ error: 'No orders found' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const cancelOrder = async (req, res) => {
    const touristId = req.user._id;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing order ID' });
    }

    try {
        const order = await orderModel.findById(id);
        if(!order){
            return res.status(404).json({ error: 'Could not find order with ID: ' + id });
        }
        if(order.orderedBy.toString() !== touristId.toString()){
            return res.status(403).json({ error: 'You are not authorized to cancel this order' });
        }
        if(order.status == 'cancelled'){
            return res.status(400).json({ error: 'Order already cancelled' });
        }
        order.status = 'cancelled';
        await order.save();
        return res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
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
    commentOnActivity,
    rateProduct,
    reviewProduct,
    getLevel,
    getavailablePoints,
    getTotalPoints,
    getAllCurrencies,
    saveEvent,
    viewSavedEvents,
    removeSavedEvents,
    addToWishlist,
    viewWishlist,
    removeFromWishlist,
    issueAnOrder,
    viewOrders,
    cancelOrder
};