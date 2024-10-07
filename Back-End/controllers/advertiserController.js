const mongoose = require('mongoose'); // Add this line at the top of your file
const Advertiser = require('../models/userModel').Advertiser;
const ActivityModel = require('../models/objectModel').Activity;
const TagModel = require('../models/objectModel').PrefTag;
const CategoryModel = require('../models/objectModel').ActivityCategory;

// functions
const getProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found' });
        }
        if (!advertiser.accepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted' });
        }
        res.json({ advertiser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id);
        if (!advertiser) {
            return res.status(404).json({ error: 'Advertiser not found' });
        }
        if (!advertiser.accepted) {
            return res.status(403).json({ error: 'Advertiser account not yet accepted' });
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

//create activity
const createActivity = async (req, res) => {
    const { title, date, time, location, price, priceRange, ratings, category, tags, specialDiscounts, bookingIsOpen, createdBy } = req.body;
    console.log(req.user); // Check if req.user is set
    // If tags are provided, check if all tags exist in the TagModel
    // If tags are provided, check if all tags exist in the TagModel
    if (tags && tags.length > 0) {
        // Extract the types of the tags from the request
        const tagTypes = tags.map(tag => tag.type);

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
    const existingCategory = await CategoryModel.findOne({ category: category }); // Adjust the field name as necessary
    if (!existingCategory) {
        return res.status(400).json({ error: 'Category does not exist' });
    }
    try {
        const newActivity = await ActivityModel.create({
            title, date, time, location, price, priceRange, ratings, category, tags, specialDiscounts, bookingIsOpen, createdBy

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
    const myID = req.params.id;
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

module.exports = { getProfile, updateProfile, getAdvertiserId, createActivity, readActivities, updateActivity, deleteActivity, getAllAdvertisers, readOneActivity, readOneActivityByName, myCreatedActivities };

