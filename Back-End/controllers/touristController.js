const { Product } = require('../models/objectModel');
const { TourGuide } = require('../models/userModel');
const ProdModel = require('../models/objectModel').Product;
const Tourist = require('../models/userModel').Tourist;
const PlaceModel = require('../models/objectModel').Places;
const NotificationModel = require('../models/objectModel').notification;
const ActivityModel = require('../models/objectModel').Activity;
const ItineraryModel = require('../models/objectModel').itinerary;
const ComplaintModel = require('../models/objectModel').complaint;
const orderModel = require('../models/objectModel').Order;
const BookingModel = require('../models/bookingModel');
const PromoModel = require('../models/objectModel').PromoCode;
const { sendEmail } = require('../controllers/authenticationController');
const mongoose = require('mongoose');

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
        const products = await ProdModel.find({ availableAmount: { $gt: 0 }, isArchived: false }, { availableAmount: 0, sales: 0, revenueOfThisProduct: 0 });
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

const specComplaint = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid complaint ID' });
    }

    try {

        const complaint = await ComplaintModel.findById(id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    const { eventType, eventId } = req.body;
    if (!eventType || !eventId) {
        return res.status(400).json({ error: 'Missing event type or id' })
    }
    if (eventType != "Activity" && eventType != "itinerary") {
        return res.status(400).json({ error: 'Event must be an activity or itinerary' })
    }
    try {
        const touristProf = await Tourist.findById(touristId);
        if (!touristProf) {
            return res.status(400).json({ error: 'Could not find tourist with this ID' })
        }
        touristProf.savedEvents.push({ eventType, eventId })
        await touristProf.save();
        return res.status(200).json({ message: 'Event saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const viewSavedEvents = async (req, res) => {
    const touristId = req.user._id;
    try {
        const touristProf = await Tourist.findById(touristId);
        if (!touristProf) {
            return res.status(404).json({ error: 'Could not find the tourist' })
        }
        return res.status(200).json(touristProf.savedEvents);
    } catch (error) {
        return res.status(500).json({ error: error.message })
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
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing product ID' });
    }

    try {
        // Find the product by ID
        const productDet = await Product.findById(id);
        if (!productDet) {
            return res.status(400).json({ error: 'Could not find the product' });
        }

        // Find the tourist profile by ID
        const touristProf = await Tourist.findById(touristId);
        if (!touristProf) {
            return res.status(404).json({ error: 'Tourist not found' });
        }

        // Check if the product is already in the wishlist
        if (touristProf.wishlist.includes(id)) {
            return res.status(400).json({ error: 'Product already in wishlist' });
        }

        // Add the product to the wishlist
        touristProf.wishlist.push(id);
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
        if (!touristProf) {
            return res.status(404).json({ error: 'Could not find the tourist' })
        }
        const wishlistProducts = await Product.find(
            { _id: { $in: touristProf.wishlist } },
            { availableAmount: 0, sales: 0, revenueOfThisProduct: 0 }
        );

        return res.status(200).json(wishlistProducts);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const removeFromWishlist = async (req, res) => {
    const touristId = req.user._id;
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: 'Missing product ID' });
        }

        const touristProf = await Tourist.findById(touristId);

        touristProf.wishlist = touristProf.wishlist.filter(product => !product.equals(id));
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
        for (const product of products) {
            const productDet = await Product.findById(product.productId);
            if (!productDet) {
                return res.status(404).json({ error: 'Could not find product with ID: ' + product.productId });
            }
            if (productDet.availableAmount < product.quantity) {
                return res.status(400).json({ error: 'Not enough stock for product: ' + productDet.name });
            }
            totalPrice += productDet.price * product.quantity;
        }
        const order = await orderModel.create({ orderedBy: touristId, products: products, totalPrice: totalPrice, date: new Date(), status: 'pending' });
        return res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const viewOrders = async (req, res) => {
    const touristId = req.user._id;
    try {
        const orders = await orderModel.find({ orderedBy: touristId }).populate('products.productId', 'name price');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        }

        // Transform the orders to include product names, prices, and quantities
        const transformedOrders = orders.map(order => ({
            ...order.toObject(),
            products: order.products.map(product => ({
                name: product.productId.name,
                price: product.productId.price,
                quantity: product.quantity
            }))
        }));

        return res.status(200).json(transformedOrders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const touristId = req.user._id;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Missing order ID' });
    }

    try {
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Could not find order with ID: ' + id });
        }
        if (order.orderedBy.toString() !== touristId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to cancel this order' });
        }
        if (order.status == 'cancelled') {
            return res.status(400).json({ error: 'Order already cancelled' });
        }
        order.status = 'cancelled';
        await order.save();
        return res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addToCart = async (req, res) => {
    const touristId = req.user._id
    const { productId, quantity } = req.body
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Missing product ID or quantity' })
    }
    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ error: 'Could not find product with ID: ' + productId })
        }
        if (product.availableAmount < quantity) {
            return res.status(400).json({ error: 'Not enough stock for product: ' + product.name })
        }
        const tourist = await Tourist.findById(touristId)
        if(productId in tourist.cart){
            return res.status(400).json({ error: 'Product already in cart, you can change the quantity you want to order' })
        }
        tourist.cart = [...tourist.cart, { productId, quantity }]
        await tourist.save()
        return res.status(200).json({ message: 'Product added to cart successfully', cart: tourist.cart })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const removeFromCart = async (req, res) => {
    const touristId = req.user._id
    const { productId } = req.body
    if (!productId) {
        return res.status(400).json({ error: 'Missing product ID' })
    }
    try {
        const tourist = await Tourist.findById(touristId);
        tourist.cart = tourist.cart.filter(product => !product.productId.equals(productId));
        await tourist.save();
        return res.status(200).json({ message: "Successfully removed the product from the cart" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const changeAmountInCart = async (req, res) => {
    const touristId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Missing product ID or quantity' });
    }
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Could not find product with ID: ' + productId });
        }
        if (product.availableAmount < quantity) {
            return res.status(400).json({ error: 'Not enough stock for product: ' + product.name });
        }
        const tourist = await Tourist.findById(touristId);
        const cartItem = tourist.cart.find(item => item.productId.equals(productId));
        if (cartItem) {
            cartItem.quantity = quantity;
        } else {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        await tourist.save();
        return res.status(200).json({ message: 'Product quantity updated successfully', cart: tourist.cart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const viewCart = async (req, res) => {
    const touristId = req.user._id;
    try {
        const tourist = await Tourist.findById(touristId).populate('cart.productId', 'name');
        if (!tourist) {
            return res.status(404).json({ error: 'Tourist not found' });
        }

        // Transform the cart to include product names and quantities
        const transformedCart = tourist.cart.map(item => ({
            id: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity
        }));

        return res.status(200).json(transformedCart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const checkoutOrder = async (req, res) => {
    const touristId = req.user._id;
    const { cart } = req.body;

    if (!cart) {
        return res.status(400).json({ error: 'Missing cart' });
    }

    try {
        let totalPrice = 0;
        for (const item of cart) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ error: 'Could not find product with ID: ' + item.productId });
            }
            if (product.availableAmount < item.quantity) {
                return res.status(400).json({ error: 'Not enough stock for product: ' + product.name });
            }
            totalPrice += product.price * item.quantity;
        }

        const order = await orderModel.create({ orderedBy: touristId, products: cart, totalPrice: totalPrice, date: new Date(), status: 'pending' });
        return res.status(200).json({ order: order.products })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const beNotified = async (req, res) => {
    const eventID = req.params.id;
    const touristID = req.user._id;
    try {
        // Find the tourist by ID
        const tourist = await Tourist.findById(touristID);

        // Update the notify property of the specific event
        const updatedTourist = await Tourist.findOneAndUpdate(
            { _id: touristID, 'savedEvents.eventId': eventID },
            { $set: { 'savedEvents.$.notify': true } }
        );
        if (!updatedTourist) {
            return res.status(404).json({ error: 'Event not found in saved events' });
        }
        return res.status(200).json({ message: 'Notification preference updated', tourist: updatedTourist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating notification preference' });
    }
};
const bookingIsOpenReminder = async (req, res) => {
    const touristID = req.user._id;

    try {
        const tourist = await Tourist.findById(touristID).populate('savedEvents.eventId');

        const notifications = []; // Array to hold notification promises for batch processing
        const emailPromises = []; // Array to hold email promises

        for (const event of tourist.savedEvents) {
            if (event.notify) {
                let activity, itinerary;

                if (event.eventType === 'Activity') {
                    activity = await ActivityModel.findById(event.eventId);
                    if (!activity) {
                        console.error('Activity does not exist:', event.eventId);
                        continue; // Skip to the next event
                    }
                    if (activity.bookingIsOpen) {
                        const notification = await NotificationModel.create({
                            userID: touristID,
                            message: `Your saved Activity ${activity.title} can be booked now.`,
                            reason: 'Open For Booking',
                            ReasonID: activity._id
                        });
                        notifications.push(notification);
                        emailPromises.push(sendEmail(tourist.email, notification.reason, notification.message));
                    }
                } else if (event.eventType === 'itinerary') {
                    itinerary = await ItineraryModel.findById(event.eventId);
                    if (!itinerary) {
                        console.error('Itinerary does not exist:', event.eventId);
                        continue; // Skip to the next event
                    }
                    if (itinerary.bookingIsOpen) {
                        const notification = await NotificationModel.create({
                            userID: touristID,
                            message: `Your saved Itinerary ${itinerary.title} can be booked now.`,
                            reason: 'Open For Booking',
                            ReasonID: itinerary._id
                        });
                        notifications.push(notification);
                        emailPromises.push(sendEmail(tourist.email, notification.reason, notification.message));
                    }
                }
            }
        }

        await Promise.all(emailPromises); // Send all emails in parallel
        return res.status(200).json({ message: 'Booking reminders processed successfully', notifications });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const myNotifications = async (req, res) => {
    const { _id } = req.user._id;

    try {
        const myNotification = await NotificationModel.find({ userID: _id });
        res.status(200).json(myNotification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
const seenNotifications = async (req, res) => {
    const { _id } = req.user._id;

    try {
        const result = await NotificationModel.updateMany(
            { userID: _id }, // Match notifications by userID
            { $set: { seen: true } } // Update the "seen" field to true
        );

        res.status(200).json({ message: 'Notifications updated', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const deleteNotification = async (req, res) => {
    const notificationID = req.params.id; // Assuming the notification ID is passed as a URL parameter
    const userID = req.user._id;
    try {
        const notification = await NotificationModel.findOneAndDelete({
            _id: notificationID,
            userID: userID,
        });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found or you do not have permission to delete it.' });
        }

        return res.status(200).json({ message: 'Notification deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const clearNotifications = async (req, res) => {
    const userID = req.user._id;
    
    try {
        const result = await NotificationModel.deleteMany({ userID: userID });

        return res.status(200).json({ message: 'All notifications cleared successfully.', deletedCount: result.deletedCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const bookingNotification = async (req, res) => {
    const touristID = req.user._id;
    try {
        const currentDate = new Date();
        const fourDaysFromNow = new Date();
        fourDaysFromNow.setDate(currentDate.getDate() + 4);
        const bookings = await BookingModel.find({
            userID: touristID,
            startDate: { $gte: currentDate, $lt: fourDaysFromNow }
        });
        const notifications = [];
        const emailPromises = [];
        for (const booking of bookings) {
            const notification = await NotificationModel.create({
                userID: touristID,
                message: `Your booking for ${booking.activityName} is starting on ${booking.startDate.toDateString()}!`,
                reason: 'Upcoming Booking Reminder',
                ReasonID: booking._id
            });
            notifications.push(notification);
        }
        await Promise.all(emailPromises); // Send all emails in parallel
        return res.status(200).json({
            message: 'Notifications created successfully.',
            notifications
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


/**
 * Adds one or multiple delivery addresses to the user's profile.
 * 
 * @param {Object} req - The request object containing user ID and delivery addresses.
 * @param {Object} res - The response object to send the result.
 * 
 * Request body should contain:
 * - deliveryAddresses: Array of delivery address objects, each with the following fields:
 *   - street: {String, required}
 *   - city: {String, required}
 *   - state: {String, optional}
 *   - postalCode: {String, required}
 *   - country: {String, required}
 *   - googleMapsUrl: {String, required}
 * 
 * Example request body:
 * {
 *   "deliveryAddresses": [
 *     {
 *       "street": "123 Main St",
 *       "city": "Anytown",
 *       "postalCode": "12345",
 *       "country": "USA",
 *       "googleMapsUrl": "https://maps.google.com/?q=123+Main+St,+Anytown,+CA+12345"
 *     },
 *     {
 *       "street": "456 Elm St",
 *       "city": "Othertown",
 *       "state": "TX",
 *       "postalCode": "67890",
 *       "country": "USA",
 *       "googleMapsUrl": "https://maps.google.com/?q=456+Elm+St,+Othertown,+TX+67890"
 *     }
 *   ]
 * }
 */
const addDeliveryAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { deliveryAddresses } = req.body;

        const user = await Tourist.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add new delivery addresses to the user's existing addresses
        user.deliveryAddresses.push(...deliveryAddresses);
        await user.save();

        return res.status(200).json({ message: 'Delivery addresses added successfully.', deliveryAddresses: user.deliveryAddresses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding delivery addresses.' });
    }
};

const getDeliveryAddresses = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await Tourist.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({
            deliveryAddresses: user.deliveryAddresses,
            activeAddress: user.activeAddress
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching delivery addresses.' });
    }
}

const setActiveDeliveryAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.body;

        const user = await Tourist.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.deliveryAddresses.some(address => address._id.equals(addressId))) {
            return res.status(404).json({ message: 'Address not found.' });
        } else {
            user.activeAddress = addressId;
            await user.save();
            return res.status(200).json({ message: 'Active address updated successfully.', activeAddress: user.activeAddress });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while setting active delivery address.' });
    }
}
const birthDaycode = async (req, res) => {
    const userID = req.user._id;
    try {
        const tourist = await Tourist.findById(userID);

        const today = new Date();
        const currentYear = today.getFullYear();
        const expiry = new Date(today);
        expiry.setDate(today.getDate() + 1);

        // Check if it's the user's birthday
        const dob = new Date(tourist.dob);
        if (today.getDate() !== dob.getDate() || today.getMonth() !== dob.getMonth()) {
            return res.status(200).json({ message: "Not your birthday" });
        }

        // Check if a promo already exists for this user and year
        const existingPromo = await PromoModel.findOne({
            code: `BIRTHDAY_DISCOUNT_${currentYear}`,
            touristId: userID,
        });
        if (existingPromo) {
            return res.status(400).json({ error: "Promocode already exists" });
        }

        // Create new promo code
        const promocode = await PromoModel.create({
            code: `BIRTHDAY_DISCOUNT_${currentYear}`,
            type: "PERCENTAGE",
            discount: 30,
            expiryDate: expiry,
            birthday: true,
            touristId: userID,
        });
        const notification = await NotificationModel.create({
            userID: userID,
            message: `Dear ${tourist.username}, Here's a Promocode: ${promocode.code} to celebrate.`,
            reason: "Happy Birthday!",
            ReasonID: promocode._id,
        });

        await sendEmail(tourist.email, notification.reason, notification.message);

        return res.status(200).json({
            message: "Promocode created successfully",
            promocode,
            notification,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const redeemPromo = async(req,res)=>{
    const codeToRedeem = req.params;
    const PromoCode = await PromoModel.find({code:codeToRedeem});
    if(!PromoCode){
        return res.status(404).json({ error: 'Promocode does not exist.'});
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
    specComplaint,
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
    cancelOrder,
    beNotified,
    bookingIsOpenReminder,
    myNotifications,
    seenNotifications,
    clearNotifications,
    deleteNotification,
    bookingNotification,
    addDeliveryAddress,
    getDeliveryAddresses,
    setActiveDeliveryAddress,,
    addToCart,
    viewCart,
    removeFromCart,
    changeAmountInCart,
    birthDaycode
};