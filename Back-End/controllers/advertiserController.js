const mongoose = require('mongoose');
const Advertiser = require('../models/userModel').Advertiser;
const ActivityModel = require('../models/objectModel').Activity;
const TagModel = require('../models/objectModel').PrefTag;
const CategoryModel = require('../models/objectModel').ActivityCategory;
const NotificationModel = require('../models/objectModel').notification;
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { Types } = require('mongoose');

// Collection name in MongoDB
const collectionName = 'uploads';

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

// functions
const getProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user._id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found' });
        }
        if (!advertiser.accepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted' });
        }
        if (!advertiser.isTermsAccepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted terms and conditions' });
        }
        res.json({ advertiser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user._id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found' });
        }
        if (!advertiser.accepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted' });
        }
        if (!advertiser.isTermsAccepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted terms and conditions' });
        }
        const updatedAdvertiser = await Advertiser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAdvertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get the id of the first advertiser
const getAdvertiserId = async (req, res) => {
    try {
        const advertiser = await Advertiser.findOne({});
        res.json(advertiser._id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// upload logo
const uploadLogo = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const advertiser = await Advertiser.findById(req.user._id);
            if (!advertiser) {
                return res.status(404).json({ error: 'Advertiser not found' });
            }
            if (!advertiser.accepted) {
                return res.status(403).json({ error: 'Advertiser account not yet accepted' });
            }
            if (!advertiser.isTermsAccepted) {
                return res.status(403).json({ error: 'Advertiser account not yet accepted terms and conditions' });
            }

            const file = req.files[0];

            const documentMetadata = {
                filename: file.filename,
                contentType: file.contentType,
                fileID: file.id
            };

            advertiser.logo = documentMetadata;

            await advertiser.save();

            res.json({ message: 'Logo uploaded' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}

const getLogo = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user._id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found' });
        }
        if (!advertiser.accepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted' });
        }
        if (!advertiser.isTermsAccepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted terms and conditions' });
        }

        const logo = advertiser.logo;

        const fileID = new Types.ObjectId(logo.fileID);

        // Stream the file from MongoDB GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: collectionName,
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

//create activity
const createActivity = async (req, res) => {
    const { title, date, time, location, price, priceRange, category, tags, specialDiscounts, bookingIsOpen, ratings, comments } = req.body;
    const createdBy = req.user._id;

    try {
        // If tags are provided, check if all tags exist in the TagModel
        if (tags && tags.length > 0) {
            // Extract the types of the tags from the request
            const tagTypes = tags.map(tag => tag.type.toLowerCase());

            // Fetch existing tags from the database
            const existingTags = await TagModel.find({ type: { $in: tagTypes } });

            // Create an array of existing tag types for comparison
            const existingTagTypes = existingTags.map(tag => tag.type.toLowerCase);

            // Check if every tag in the request exists in the existing tags
            const allTagsExist = tagTypes.every(type => existingTagTypes.includes(type.toLowerCase));

            if (!allTagsExist) {
                return res.status(400).json({ error: 'Some tags do not exist' });
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    const existingCategory = await CategoryModel.findOne({ category: category }); // Adjust the field name as necessary
    if (!existingCategory) {
        return res.status(400).json({ error: 'Category does not exist' });
    }
    try {
        const newActivity = await ActivityModel.create({
            title, date, time, location, price, priceRange, ratings, category, tags, specialDiscounts, bookingIsOpen, createdBy, comments

        });
        res.status(200).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
//Read one activity by id/name
// Read a single activity by ID
const readOneActivity = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid activity ID' });
    }

    try {

        const activity = await ActivityModel.findById(id);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//read one activity by name

const readOneActivityByName = async (req, res) => {
    const { name } = req.params;

    try {
        const activity = await ActivityModel.findOne({ title: name });
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Read the activity    ????sure without body?????????????????????
const readActivities = async (req, res) => {
    try {

        const allActivities = await ActivityModel.find({}).sort({ createdAt: -1 });
        if (!allActivities.length) {
            // Debugging statement

            // Respond with an empty array if no activities are found
            return res.status(200).json({ message: 'No activities found' });
        }

        console.log("Activities found:", allActivities); // Debugging statement

        res.status(200).json(allActivities);
    } catch (error) {
        console.error("Error fetching activities:", error.message);

        res.status(404).json({ error: error.message });
    }
}
//get myCreatedActivities
const myCreatedActivities = async (req, res) => {
    const myID = req.user._id;
    if (myID) {
        const myActivities = await ActivityModel.find({ createdBy: myID });
        res.status(200).json(myActivities);
    } else {
        res.status(400).json({ error: 'UserID is required' })
    }

};


//Update An Activity
const updateActivity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    try {
        const theUpdatedActivity = await ActivityModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(theUpdatedActivity)

        // const theUpdatedActivity = await ActivityModel.findOneAndUpdate({_id: id},{
        //     ...req.body
        //  })

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//Delete Activity
const deleteActivity = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such ID' })
    }

    try {

        const deleteAnActivityD = await ActivityModel.findById(id);
        if (!deleteAnActivityD) {
            return res.status(200).json({ message: 'This activity is not found to be deleted' });

        }
        const deleteAnActivity = await ActivityModel.findByIdAndDelete(id);
        if (!deleteActivity) {
            res.status(200).json({ message: 'This activity is not found to be deleted' });

        }
        res.status(200).json({ message: 'Successfully Deleted', deleteAnActivity });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}

//to get the advertisers
const getAllAdvertisers = async (req, res) => {
    try {
        const advertisers = await Advertiser.find({});
        res.status(200).json(advertisers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const myNotifications = async(req,res)=>{
    const { _id } = req.user._id;

    if (!_id) {
        return res.status(400).json({ error: 'UserID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid UserID format' });
    }

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

    if (!_id) {
        return res.status(400).json({ error: 'UserID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid UserID format' });
    }

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
module.exports = { getProfile, updateProfile, uploadLogo, getLogo, getAdvertiserId, createActivity, readActivities, updateActivity, deleteActivity, getAllAdvertisers, readOneActivity, readOneActivityByName, myCreatedActivities,myNotifications,seenNotifications };

//view sales Report
const viewSalesReport = async (req,res) => {
    const advertiserId = req.user._id;

    try{
        if (!mongoose.Types.ObjectId.isValid(advertiserId)) {
            return res.status(400).json({ error: 'Wrong ID format' });
        }
        const createdActivity = await ActivityModel.find({createdBy: advertiserId});
        const activityRevenue = createdActivity.reduce((total,activity) => total + (activity.revenueOfThisActivity || 0) , 0);

        const report = {
            activityRevenue,
            totalRevenue : activityRevenue,
        };
        res.status(200).json({ message: "Sales report generated successfully", report });

    }catch(error){
        res.status(404).json({ error: error.message });

    }
}

module.exports = { getProfile, updateProfile, uploadLogo, getLogo, getAdvertiserId, createActivity, readActivities, updateActivity, deleteActivity, getAllAdvertisers, readOneActivity, readOneActivityByName, myCreatedActivities,myNotifications,viewSalesReport };
