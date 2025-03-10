const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('../models/userModel').User;
const TouristModel = require('../models/userModel').Tourist;
const SellerModel = require('../models/userModel').Seller;
const AdvertiserModel = require('../models/userModel').Advertiser;
const TourGuideModel = require('../models/userModel').TourGuide;
const TourismGovernorModel = require('../models/tourGovernerModel');

const tagSchema = new Schema
    ({// for the tags to be created independently from the places
        type: { type: String, required: true }
    });
const Tags = mongoose.model('Tags', tagSchema);

const PreferencedTagSchema = new Schema
    ({// for the tags to be created independently from the places
        type: { type: String, required: true }
    });
const PrefTag = mongoose.model('Preference Tags', PreferencedTagSchema);

const placeSchema = new Schema({
    title:
        { type: String, required: true },
    description:
        { type: String, required: true },
    pictures:
        [{ data: Buffer, type: String, required: true }],
    location:
        { type: String, required: true },
    openingHours:
        { type: String, required: true },
    ticketPrices:
        [{ type: Number, required: true }], // array of Numbers as it differs from [Foreigners,Students and Natives] and can store Floating Numbers
    tags:
        [{ type: tagSchema, required: false, default: null }],// tags are optional
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: TourismGovernorModel,
        required: false,
    },
});
const Places = mongoose.model('Places', placeSchema);

const ratingSchema = new Schema({
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: false },
    rating: { type: Number, min: 1, max: 5 },
})
const rating = mongoose.model('rating', ratingSchema);
const documentSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    fileID: String,
});

const productSchema = new Schema({
    name:
        { type: String, required: true },
    picture:
        { type: documentSchema, required: false },
    price:
        { type: Number, required: true },
    description:
        { type: String, required: true },
    seller:
    {
        type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: 'seller'
    },
    ratings:
        [{ type: ratingSchema, required: false, default: null }],
    rating:
        { type: Number, required: false, default: null },
    isArchived: { type: Boolean, default: false },
    reviews:
        [{
            touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            review: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }],
    availableAmount:
        { type: Number, required: true },
    sales: { type: Number, required: true, default: 0 },
    revenueOfThisProduct: { type: Number, required: true, default: 0 }

}, { timestamps: true });

//middleware to calculate the average ratings
productSchema.pre('save', function (next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + val.rating, 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});

//function to update availability and sales of product
productSchema.methods.updateAvailabilityAndSales = async function (quantity) {
    if (this.availableAmount < quantity) {
        throw new Error('Not enough stock available');
    }
    this.availableAmount -= quantity;
    this.sales += quantity;
    await this.save();

}

//Middleware to calculate total revenue of specific product
productSchema.pre('save', function (next) {
    this.revenueOfThisProduct = this.sales * this.price;
    next();
});


const Product = mongoose.model('Product', productSchema);

//category Schema
const activityCategorySchema = new Schema({
    category: { type: String, required: true }

})
const ActivityCategory = mongoose.model('Category', activityCategorySchema);

//activity schema
const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true }, //Google maps??
    price: { type: Number, required: true },
    priceRange: { type: String, required: false },
    category: { type: String, ref: 'ActivityCategory', required: true },
    tags: { type: [PreferencedTagSchema], default: [] },
    specialDiscounts: { type: String },
    bookingIsOpen: { type: Boolean, default: true },
    NoOfBooking: { type: Number, default: 0 },
    touristsCount: { type: Number, default: 0 },
    revenueOfThisActivity: { type: Number, default: 0 }, //!!!!!!!!!!!!!ensure that it is not seen by tourist
    ratings: [{ type: ratingSchema, required: false, default: null }],
    rating: { type: Number, default: null },
    comments: [
        {
            touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdvertiserModel',
        required: false,
    },
    flagged: { type: Boolean, default: false },  // This field tracks if the activity is flagged
}, { timestamps: true });

// Middleware to exclude activities where the createdBy user has requestToBeDeleted set to true
activitySchema.pre('find', async function (next) {
    if (!this.getQuery().includeDeleted) {
        const User = mongoose.model('User');
        const usersToExclude = await User.find({ requestToBeDeleted: true }).distinct('_id');
        this.where({ createdBy: { $nin: usersToExclude } });
    } else {
        delete this.getQuery().includeDeleted;
    }
    next();
});

activitySchema.pre('findOne', async function (next) {
    if (!this.getQuery().includeDeleted) {
        const User = mongoose.model('User');
        const usersToExclude = await User.find({ requestToBeDeleted: true }).distinct('_id');
        this.where({ createdBy: { $nin: usersToExclude } });
    } else {
        delete this.getQuery().includeDeleted;
    }
    next();
});

// Virtual property to format the date without the time zone
activitySchema.virtual('formattedDate').get(function () {
    return this.date.toISOString().split('T')[0];
});

// Ensure virtual fields are serialized
activitySchema.set('toJSON', { virtuals: true });
activitySchema.set('toObject', { virtuals: true });

//middleware to update revenue when bookings are incremented
activitySchema.methods.updateRevenue = async function () {
    if (this.NoOfBooking !== undefined && this.price !== undefined) {
        this.revenueOfThisActivity = this.NoOfBooking * this.price;
    }
    await this.save();
};
activitySchema.pre('save', function (next) {
    this.revenueOfThisActivity = this.NoOfBooking * this.price;
    next();
});


//middleware to update the ratings of activity
activitySchema.pre('save', function (next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + (val.rating || 0), 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});
activitySchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const activity = await this.model.findOne(this.getQuery());

    if (update.NoOfBooking !== undefined || update.price !== undefined) {
        const newRevenue = (update.NoOfBooking ?? activity.NoOfBooking) * (update.price ?? activity.price);
        update.revenueOfThisActivity = newRevenue;
    }

    next();
});

const Activity = mongoose.model('Activity', activitySchema);


//itinerary Schema
const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true }],
    locations: [{ type: String, required: true }],
    timeline: { type: String, required: true },
    duration: { type: String, required: true },
    language: { type: String, required: true },
    price: { type: Number, required: true },
    availableDates: [{ type: Date, required: true }],
    time: [{ type: String, required: true }],
    accessibility: { type: Boolean, required: true },
    pickUpLocation: { type: String, required: true },
    dropOffLocation: { type: String, required: true },
    tags: [{ type: PreferencedTagSchema, required: false, default: null }],
    ratings: [{ type: ratingSchema, required: false, default: null }],
    rating: { type: Number, default: null },
    comments: [
        {
            touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    BookingAlreadyMade: { type: Boolean, default: false },
    NoOfBookings: { type: Number, default: 0 },
    touristsCount: { type: Number, default: 0 },
    revenueOfThisItinerary: { type: Number, default: 0 },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourGuideModel',
        required: false,
    },
    /*
   Added the following field to handle the availability of booking
   For the requirement "Activate/ deactivate an itinerary with bookings"
   */
    bookingIsOpen: {
        type: Boolean,
        default: true
    },
    flagged: { type: Boolean, default: false },  // This field tracks if the activity is flagged
}, { timestamps: true });

// Middleware to exclude itineraries where the createdBy user has requestToBeDeleted set to true
itinerarySchema.pre('find', async function (next) {
    if (!this.getQuery().includeDeleted) {
        const User = mongoose.model('User');
        const usersToExclude = await User.find({ requestToBeDeleted: true }).distinct('_id');
        this.where({ createdBy: { $nin: usersToExclude } });
    } else {
        delete this.getQuery().includeDeleted;
    }
    next();
});

itinerarySchema.pre('findOne', async function (next) {
    if (!this.getQuery().includeDeleted) {
        const User = mongoose.model('User');
        const usersToExclude = await User.find({ requestToBeDeleted: true }).distinct('_id');
        this.where({ createdBy: { $nin: usersToExclude } });
    } else {
        delete this.getQuery().includeDeleted;
    }
    next();
});
/*
itinerarySchema.pre('save', function (next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + (val.rating || 0), 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});
*/
//middleware to update revenue of itinerary
itinerarySchema.methods.updateRevenue = async function () {
    // Fetch all activities related to this itinerary
    const activities = await Activity.find({ _id: { $in: this.activities } });
    const totalActivityRevenue = activities.reduce((total, activity) => total + (activity.revenue || 0), 0);
    this.revenueOfThisItinerary = totalActivityRevenue + (this.NoOfBookings * this.price);
    
    // Save the updated itinerary revenue
    await this.save();
};
itinerarySchema.pre('save', async function (next) {
    // Update average rating if ratings exist
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + (val.rating || 0), 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }

    // Update itinerary revenue
    if (this.activities && this.activities.length > 0) {
        const activities = await Activity.find({ _id: { $in: this.activities } });
        const totalActivityRevenue = activities.reduce((total, activity) => total + (activity.revenue || 0), 0);
        this.revenueOfThisItinerary = totalActivityRevenue + (this.NoOfBookings * this.price);
    } else {
        this.revenueOfThisItinerary = this.NoOfBookings * this.price; // Base revenue if no activities
    }

    next(); // Proceed with the save operation
});


const itinerary = mongoose.model('itinerary', itinerarySchema);

const complaintSchema = new Schema({
    title:
        { type: String, required: true },
    body:
        { type: String, required: true },
    status:
        { type: String, required: false, default: 'Pending' },
    date:
        { type: Date, required: false, default: Date.now },
    reply:
        { type: String, required: false },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: TouristModel,
        required: false,
    }
});

const complaint = mongoose.model('complaint', complaintSchema)

const transportationSchema = new Schema({
    company:
        { type: String, required: false },
    type:
        { type: String, required: true },
    price:
        { type: Number, required: true },
    departure:
        { type: String, required: true },
    arrival:
        { type: String, required: true },
    date:
        { type: Date, required: false, default: Date.now },
    bookingAlreadyMade:
        { type: Boolean, required: true, default: false },
    pickUpLocation:
        { type: String, required: true },
    dropOffLocation:
        { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: AdvertiserModel,
        required: false,
    }
});

const transportation = mongoose.model('transportation', transportationSchema)

// Define a sub-schema for the products in the order
const orderProductSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new Schema({
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
    products: [orderProductSchema], // Use the sub-schema for products
    totalPrice: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'cancelled', 'sent to delivery', 'delivered']
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'cod', 'pending'],
        default: 'pending'
    }
});

// Pre-save middleware to calculate totalPrice
orderSchema.pre('save', async function (next) {
    try {
        const productIds = this.products.map(p => p.productId);
        const products = await Product.find({ _id: { $in: productIds } });
        this.totalPrice = this.products.reduce((acc, p) => {
            const product = products.find(prod => prod._id.equals(p.productId));
            return acc + (product.price * p.quantity);
        }, 0);
        next();
    } catch (error) {
        next(error);
    }
});

const Order = mongoose.model('Order', orderSchema);

const notificationSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
    message: { type: String, required: false },
    reason: { type: String, required: false },
    ReasonID: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    seen: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, default: Date.now }
});
const notification = mongoose.model('notification', notificationSchema);


module.exports = {
    Places,
    Tags,
    Product,
    Activity,
    itinerary,
    ActivityCategory,
    PrefTag,
    complaint,
    rating,
    transportation,
    Order,
    notification
}