const AdminModel = require('../models/adminModel');
const { User, Advertiser, TourGuide, Tourist,PromoCode, Seller } = require('../models/userModel');
const tourGovModel = require('../models/tourGovernerModel');
const NotificationModel = require('../models/objectModel').notification;
const ItineraryModel = require('../models/objectModel').itinerary;
const ActivityModel = require('../models/objectModel').Activity;
const ProdModel = require('../models/objectModel').Product;
const CategoryModel = require('../models/objectModel').ActivityCategory;
const TagModel = require('../models/objectModel').PrefTag;
const ComplaintModel = require('../models/objectModel').complaint;
const { Activity, itinerary } = require('../models/objectModel');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const validator = require('validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { sendEmail } = require('../controllers/authenticationController');
const { once } = require('events');
const { Types } = require('mongoose');
// Collection name in MongoDB
const collectionName = 'uploads';
const moment = require('moment'); 

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection(collectionName);
});

// Set up GridFS storage
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            bucketName: collectionName,
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

// File filter to allow only photos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};


const upload = multer({
    storage,
    fileFilter
}).array('documents', 1);

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find({})
        res.status(200).json(admins)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
//getAllUsers
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ accepted: true });
        const admins = await AdminModel.find({});
        const tourG = await tourGovModel.find({});

        const allUsers = [...users, ...admins, ...tourG];

        res.status(200).json({ users: allUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete account off system
const deleteAccount = async (req, res) => {
    const { id } = req.params;

    // Validate input
    let userAccount = await User.findOne({ _id: id });
    let adminAccount = await AdminModel.findOne({ _id: id });
    let tourGovAccount = await tourGovModel.findOne({ _id: id });

    if (!userAccount && !tourGovAccount && !adminAccount) {
        return res.status(400).json({ error: 'Account not found' });
    }

    try {
        if (adminAccount) {
            adminAccount = await AdminModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Account deleted', adminAccount });
        }
        else if (userAccount) {
            userAccount = await User.findByIdAndDelete(id);
            res.status(200).json({ message: 'Account deleted', userAccount });
        }
        else {
            tourGovAccount = await tourGovModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Account deleted', tourGovAccount });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add another admin
const addAdmin = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be strong, must contain uppercase, number, and special character');
    }

    try {
        // Checking if the username already exists
        const existingAdmin = await AdminModel.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await AdminModel.create({ username, password: hashedPassword });
        res.status(200).json(admin)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


//Admin get products
const getProducts = async (req, res) => {
    try {
        // Fetch all products and populate the seller's name and ID
        const products = await ProdModel.find()
            .populate('seller', 'username')
            .exec();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Admin getProdById
const getProdById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid product ID' });
    }

    try {

        const product = await ProdModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductPhoto = async (req, res) => {
    try {
        const product = await ProdModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const photo = product.picture;

        const fileID = new Types.ObjectId(photo.fileID);

        // Stream the file from MongoDB GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads', // Replace with your bucket name if different
        });

        const downloadStream = bucket.openDownloadStream(fileID);

        // Set headers for displaying the image
        downloadStream.on('file', (file) => {
            res.set('Content-Type', file.contentType);
        });

        // Pipe the download stream to the response
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            console.error('Download Stream Error:', err);
            res.status(500).json({ error: err.message });
        });

        downloadStream.on('end', () => {
            res.end();
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Admin getAvailableProducts
const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 } /*, isArchived: false*/ }, { isArchived: 1, availableAmount: 1, sales: 1, revenueOfThisProduct: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Admin addProduct

const addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { name, price, description, ratings, rating, reviews, availableAmount } = req.body;
        const seller = req.user._id;

        // Validate input
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Details and prices fields are required' });
        }

        try {
            // Checking if the product already exists
            const existingProduct = await ProdModel.findOne({ name, price });

            if (existingProduct) {
                return res.status(400).json({ error: 'Product already exists' });
            }

            try {
                const file = req.files[0];

                const documentMetadata = {
                    filename: file.filename,
                    contentType: file.contentType,
                    fileID: file.id
                };

                // Create the product with the uploaded photo metadata
                const product = await ProdModel.create({
                    name,
                    price,
                    description,
                    seller,
                    ratings,
                    rating,
                    reviews,
                    availableAmount,
                    picture: documentMetadata
                });

                res.status(200).json(product);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, ratings, rating, reviews, availableAmount } = req.body;

    try {
        let updatedProd = await ProdModel.findById(id);
        if (!updatedProd) {
            return res.status(400).json({ error: 'Product not found' });
        }

        // Handle file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // Update fields if they are provided
            if (name) updatedProd.name = name;
            if (price) updatedProd.price = price;
            if (description) updatedProd.description = description;
            if (ratings) updatedProd.ratings = ratings;
            if (rating) updatedProd.rating = rating;
            if (reviews) updatedProd.reviews = reviews;
            if (availableAmount) updatedProd.availableAmount = availableAmount;

            // Update picture if a new one is uploaded
            if (req.files && req.files.length > 0) {
                const file = req.files[0];
                updatedProd.picture = {
                    filename: file.filename,
                    contentType: file.contentType,
                    fileID: file.id
                };
            }

            try {
                await updatedProd.save();
                res.status(200).json(updatedProd);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//add Category
const addCategory = async (req, res) => {
    const { category } = req.body;
    if (!category) {
        return res.status(400).json({ error: 'Category must be entererd' });
    }
    try {
        let createdCategory = await CategoryModel.findOne({ category });
        if (createdCategory) {
            return res.status(400).json({ error: 'Category Already Exists' })
        }
        createdCategory = await CategoryModel.create({ category });
        res.status(200).json(createdCategory)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const editCategory = async (req, res) => {
    const { id } = req.params;
    let updatedCategory = await CategoryModel.findById(id)
    if (!updatedCategory) {
        res.status(400).json({ error: 'Category not found' })
    } else {
        try {
            updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find({})
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    let deletedCategory = await CategoryModel.findById(id);
    if (!deletedCategory) {
        res.status(400).json({ error: 'Category not found.' });
    } else {
        try {
            deletedCategory = await CategoryModel.findByIdAndDelete(id)
            res.status(200).json({ message: 'Category was deleted', deletedCategory });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};



// Add a Tourism Governor
const addTourGov = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be strong, must contain uppercase, number, and special character');
    }

    try {
        // Checking if the username already exists
        let tourGov = await tourGovModel.findOne({ username });

        if (tourGov) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        tourGov = await tourGovModel.create({ username, password: hashedPassword });
        res.status(200).json(tourGov)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
//admin getAllTags
const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// admin createTag
const createTag = async (req, res) => {
    let { type } = req.body;

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }
    else {
        try {
            type = type.toLowerCase();
            const existingTag = await TagModel.findOne({ type }); // Correct model usage
            if (existingTag) {
                return res.status(400).json({ error: 'Tag already exists' });
            }

            const newTag = await TagModel.create({ type });
            res.status(200).json(newTag);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
const updateTag = async (req, res) => {
    const { id } = req.params;
    let updatedTag = await TagModel.findById(id);
    if (!updatedTag) {
        res.status(400).json({ error: 'Place not found' })
    } else {
        try {
            updatedTag = await TagModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(updatedTag);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
const deleteTag = async (req, res) => {
    const { id } = req.params;
    let deletedTag = await TagModel.findById(id);
    if (!deletedTag) {
        res.status(400).json({ error: 'Place not found' })
    } else {
        try {
            deletedTag = await TagModel.findByIdAndDelete(id, req.body)
            res.status(200).json({ message: 'Tag was Deleted', deletedTag });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintModel.find({}) // Sort by date in descending order
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const specificComplaint = async (req, res) => {
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
const markComplaint = async (req, res) => {
    const { id } = req.params;
    if (!req.body.status || (req.body.status !== 'Resolved' && req.body.status !== 'Pending')) {
        return res.status(400).json({ error: 'Status must be either "Resolved" or "Pending"' });
    }

    try {
        const updatedComplaint = await ComplaintModel.findByIdAndUpdate
            (id, { status: req.body.status }, { new: true });
        if (!updatedComplaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const reply = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedComplaint = await ComplaintModel.findByIdAndUpdate
            (id, { reply: req.body.reply }, { new: true });
        if (!updatedComplaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//admin can archive or unarchive products
const archiveProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProdModel.findByIdAndUpdate(productId, { isArchived: true }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product archived successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const unarchiveProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProdModel.findByIdAndUpdate(productId, { isArchived: false }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product unarchived successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//view available quantity and sales
const viewProductSales = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await ProdModel.findById(id, "name availableAmount sales");
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const viewAllProductSales = async (req, res) => {
    try {
        // Fetch all products with only the specified fields: name, availableAmount, and sales
        const products = await ProdModel.find({}, "name availableAmount sales");

        // Return the list of products
        return res.status(200).json(products);

    } catch (error) {
        // If an error occurs, return the error message
        res.status(400).json({ error: error.message });
    }
};


//flag an activity
const flagActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        const activity = await Activity.findByIdAndUpdate(activityId, { flagged: true }, { new: true });
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        try {
            // Step 1: Find the activity by its ID
            const activity = await ActivityModel.findById(activityId);

            if (!activity) {
                return res.status(404).json({ message: 'Activity not found.' });
            }
            const advertiser = await Advertiser.findById(activity.createdBy);
            // Step 2: Create and save the notification
            const notification = await NotificationModel.create({
                userID: activity.createdBy, // Assuming createdBy is an ObjectId referencing the User
                message: `Your Activity ${activity.title} has been flagged as inappropriate.`,
                reason: 'Inappropriate content',
                ReasonID: activityId // Set the ReasonID to the Itinerary ID
            });
            await sendEmail(advertiser.email, notification.reason, notification.message);

            // Respond with success
            return res.status(201).json({
                message: 'Event flagged successfully', activity,
                message: 'Notification created successfully.', notification
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while creating the notification.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//flag an itinerary
const flagItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const retItinerary = await itinerary.findByIdAndUpdate(id, { flagged: true }, { new: true });
        if (!retItinerary) {
            return res.status(404).json({ error: ' Itinerary with this id not found' });
        }
        try {
            // Step 1: Find the itinerary by its ID
            const itinerary = await ItineraryModel.findById(id);

            if (!itinerary) {
                return res.status(404).json({ message: 'Itinerary not found.' });
            }
            const tourGuide = await TourGuide.findById(itinerary.createdBy);
            // Step 2: Create and save the notification
            const notification = await NotificationModel.create({
                userID: itinerary.createdBy, // Assuming createdBy is an ObjectId referencing the User
                message: `Your Itinerary ${itinerary.title} has been flagged as inappropriate.`,
                reason: 'Inappropriate content',
                ReasonID: id // Set the ReasonID to the Itinerary ID
            });
            await sendEmail(tourGuide.email, notification.reason, notification.message);
            // Respond with success
            return res.status(201).json({
                message: 'Itinerary flagged successfully', retItinerary,
                message: 'Notification created successfully.', notification
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while creating the notification.' });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// const addPromoCode = async (req, res) => {
// }

//view sales report
const viewSalesReport = async (req, res) => {
    try {

        const availableProducts = await ProdModel.find({ isArchived: false });
        const availableActivities = await ActivityModel.find({})
        console.log(availableActivities);
        const itineraries = await ItineraryModel.find({});
      //  console.log(itineraries);
        let productRevenue = 0;
        for (let i = 0; i < availableProducts.length; i++) {
            productRevenue += availableProducts[i].revenueOfThisProduct || 0;
        }        
        let activityRevenue = 0;
        for (let i = 0; i < availableActivities.length; i++) {
            activityRevenue += availableActivities[i].revenueOfThisActivity || 0;
            console.log(availableActivities[i].revenueOfThisActivity );

        }
        let itineraryRevenue = 0;
        for (let i = 0; i < itineraries.length; i++) {
            itineraryRevenue += itineraries[i].revenueOfThisItinerary || 0;
        }
        // console.log(`Product Revenue: ${productRevenue}`);
        // console.log(`Activity Revenue: ${activityRevenue}`);
        // console.log(`Itinerary Revenue: ${itineraryRevenue}`);
        const totalRevenue = productRevenue + activityRevenue + itineraryRevenue;


        const productDetails = availableProducts.map(product => ({
            name: product.name,
            price: product.price,
            date: product.createdAt,
        }));

        const activityDetails = availableActivities.map(activity => ({
            title: activity.title,
            price: activity.price,
            date: activity.date,
        }));

        const itineraryDetails = itineraries.map(itinerary => ({
            title: itinerary.title,
            price: itinerary.price,
            availableDates: itinerary.availableDates,
        }));

        const report = {
            totalRevenue,
            productRevenue,
            activityRevenue,
            itineraryRevenue,
            productDetails,
            activityDetails,
            itineraryDetails,
        };
        res.status(200).json({ message: 'report successfully viewed ', report });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Unable to generate sales report', error });
    }
}
const createPromo = async (req, res) => {
    const { code, type, discount, birthday, touristId } = req.body;
    const admin = req.user._id;
    const expiry = Date.now() + (7 * 24 * 60 * 60 * 1000);
    // Validate input
    if (!code || !type || !discount) {
        return res.status(400).json({ error: ' fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingPromo = await PromoCode.findOne({ code });

        if (existingPromo) {
            return res.status(400).json({ error: 'Promocode already exists' });
        }

        const promocode = await PromoCode.create({
            code,
            type,
            discount,
            expiryDate: expiry,
            createdBy: admin
        });
        const tourists = await Tourist.find();

        // Create notifications for each tourist
        const notifications = tourists.map(tourist => ({
            userID: tourist._id,
            message: `New promo code available: ${code}`,
            reason: 'New Promo Code',
            ReasonID: promocode._id // Optional reference to the promo code
        }));

        // Insert all notifications at once
        await NotificationModel.insertMany(notifications);

        res.status(200).json(promocode)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
const promocodes = async (req, res) => {
    const promos = await PromoCode.find({});
    res.status(200).json(promos);

}
const deletePromocode = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the promocode exists
        const promocode = await PromoCode.findById(id);
        if (!promocode) {
            return res.status(404).json({ error: "Promocode not found" });
        }

        // Delete the promocode
        await PromoCode.findByIdAndDelete(id);

        return res.status(200).json({ message: "Promocode deleted successfully" });
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
// Function to get user statistics
const getUserStatstics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const newUsersPerMonth = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: moment().subtract(1, 'year').toDate(), 
                    },
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 }, 
            },
        ]);
        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            month: moment().month(i).format('MMMM'),
            count: newUsersPerMonth.find((m) => m._id === i + 1)?.count || 0,
        }));

        return res.status(200).json({
            totalUsers,
            newUsersPerMonth: monthlyData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch user statistics' });
    }
};

module.exports = {
    getAllAdmins,
    getUsers,
    deleteAccount,
    addAdmin,
    addTourGov,
    getProducts,
    getProdById,
    addProduct,
    editProduct,
    getAvailableProducts,
    addCategory,
    editCategory,
    getCategories,
    deleteCategory,
    getAllTags,
    createTag,
    updateTag,
    deleteTag,
    getAllComplaints,
    specificComplaint,
    markComplaint,
    reply,
    archiveProduct,
    unarchiveProduct,
    viewProductSales,
    flagActivity,
    flagItinerary,
    viewAllProductSales,
    getProductPhoto,
    viewSalesReport,
    createPromo,
    promocodes,
    deletePromocode,
    myNotifications,
    seenNotifications,
    getUserStatstics
}