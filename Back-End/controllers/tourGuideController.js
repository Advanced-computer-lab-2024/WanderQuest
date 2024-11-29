const mongoose = require('mongoose');
const { Activity } = require('../models/objectModel');
const TourGuide = require('../models/userModel').TourGuide;
const Itinerary = require('../models/objectModel').itinerary;
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
        const tourGuide = await TourGuide.findById(req.user._id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }
        if (!tourGuide.accepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted' });
        }
        if (!tourGuide.isTermsAccepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted terms and conditions' });
        }
        res.json(tourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.user._id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }
        if (!tourGuide.accepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted' });
        }
        if (!tourGuide.isTermsAccepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted terms and conditions' });
        }
        const updatedTourGuide = await TourGuide.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.json(updatedTourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// upload Photo
const uploadPhoto = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const tourGuide = await TourGuide.findById(req.user._id);
            if (!tourGuide) {
                return res.status(404).json({ error: 'TourGuide not found' });
            }
            if (!tourGuide.accepted) {
                return res.status(403).json({ error: 'Tour guide account not yet accepted' });
            }
            if (!tourGuide.isTermsAccepted) {
                return res.status(403).json({ error: 'Tour guide account not yet accepted terms and conditions' });
            }

            const file = req.files[0];

            const documentMetadata = {
                filename: file.filename,
                contentType: file.contentType,
                fileID: file.id
            };

            tourGuide.photo = documentMetadata;

            await tourGuide.save();

            res.json({ message: 'Photo uploaded' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}

const getPhoto = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.user._id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'TourGuide not found' });
        }
        if (!tourGuide.accepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted' });
        }
        if (!tourGuide.isTermsAccepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted terms and conditions' });
        }

        const photo = tourGuide.photo;

        const fileID = new Types.ObjectId(photo.fileID);

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

//get the id of the first tour guide
const getTourGuideId = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findOne({});
        res.json(tourGuide._id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// myCreatedItineraries
const myCreatedItineraries = async (req, res) => {
    const { _id } = req.user._id;

    if (!_id) {
        return res.status(400).json({ error: 'UserID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid UserID format' });
    }

    try {
        const myItineraries = await Itinerary.find({ createdBy: _id });
        res.status(200).json(myItineraries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


//create an itinerary 
const createItinerary = async (req, res) => {
    const createdBy = req.user._id;
    const {
        title,
        activities,
        locations,
        timeline,
        duration,
        language,
        price,
        ratings,
        availableDates,
        time,
        accessibility,
        pickUpLocation,
        dropOffLocation,
        tags,
        comments,
        BookingAlreadyMade,
    } = req.body;

    try {

        for (const activityId of activities) {
            const activityFound = await Activity.findById(activityId);
            if (!activityFound) {
                return res.status(404).json({ message: `Activity with ID ${activityId} not found.` });
            }
        }

        const newItinerary = await Itinerary.create({
            title,
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            ratings,
            availableDates,
            time,
            accessibility,
            pickUpLocation,
            dropOffLocation,
            tags,
            comments,
            BookingAlreadyMade,
            createdBy
        });
        res.status(200).json(newItinerary);
    } catch (error) {

        res.status(404).json({ error: error.message });
    }
}
//read one itinerary
const readItineraryById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid itinerary ID format' });
    }

    try {
        const itinerary = await Itinerary.findById(id).populate({
            path: 'activities',
            model: 'Activity',
            select: 'title date time location price priceRange category tags specialDiscounts ratings comments bookingIsOpen -_id',
        });

        // If itinerary is not found, return an error
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//read itinerary by name

//Read an itinerary
const readItinerary = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({})
            .populate({
                path: 'activities',
                model: 'Activity',
                select: 'title date time location price priceRange category tags specialDiscounts ratings comments bookingIsOpen -_id',
            }).sort({ createdAt: -1 });
        if (!itineraries.length) {
            // Debugging statement

            // Respond with an empty array if no activities are found
            return res.status(200).json({ message: 'No itineraries found' });
        }
        res.status(200).json(itineraries);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//update an itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;
    const createdBy = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Wrong ID format' });
    }

    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id, req.body, { new: true }).populate('activities');
        if (!updatedItinerary) {
            return res.status(404).json({ error: 'No such itinerary' });
        }
        if(updatedItinerary.createdBy.toString() !== createdBy.toString()){
            return res.status(403).json({ error: 'You are not authorized to update this itinerary' });
        }
        res.status(200).json(updatedItinerary);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//delete an itinerary
const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    const createdBy = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such itinerary' });
    }

    try {
        let itinerary = await Itinerary.findById({ _id: id });

        if (!itinerary) {
            return res.status(404).json({ error: 'No such itinerary found' });
        }

        if (itinerary.BookingAlreadyMade) {
            return res.status(400).json({ error: "Itinerary can't be deleted, bookings already made." });
        }
        if(itinerary.createdBy.toString() !== createdBy.toString()){
            return res.status(403).json({ error: 'You are not authorized to delete this itinerary' });
        }
        itinerary = await Itinerary.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Itinerary deleted successfully.', itinerary });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const activateItinerary = async (req, res) => {
    const id = req.params.id;
    const createdBy = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Wrong ID format' });
    }

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'No such itinerary' });
        }

        if (itinerary.bookingIsOpen) {
            return res.status(400).json({ error: 'Booking is already open' });
        }
        if(itinerary.createdBy.toString() !== createdBy.toString()){
            return res.status(403).json({ error: 'You are not authorized to activate this itinerary' });
        }
        itinerary.bookingIsOpen = true;
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deactivateItinerary = async (req, res) => {
    const id = req.params.id;
    const createdBy = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Wrong ID format' });
    }

    try {
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({ error: 'No such itinerary' });
        }

        if (!itinerary.bookingIsOpen) {
            return res.status(400).json({ error: 'Booking is already closed' });
        }

        if(itinerary.createdBy.toString() !== createdBy.toString()){
            return res.status(403).json({ error: 'You are not authorized to deactivate this itinerary' });
        }
        itinerary.bookingIsOpen = false;
        await itinerary.save();
        res.status(200).json(itinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


//Rate a tourGuide
const rateTourGuide = async (req, res) => {
    const  {tourGuideId}  = req.params;
    const touristId = req.user._id;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    try {
        const tourGuide = await TourGuide.findById(tourGuideId);
        console.log(tourGuide);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }

        //V.I check if tourist has already rated this tour guide
        const existingRating = tourGuide.ratings.findIndex(r => r.touristId === touristId);

        if (existingRating !== -1) {
            tourGuide.ratings[existingRating].rating = rating;
        } else {
            tourGuide.ratings.push({ touristId, rating });
        }
        // Update the average rating *********
        const totalRatings = tourGuide.ratings.reduce((acc, r) => acc + r.rating, 0);
        tourGuide.rating = totalRatings / tourGuide.ratings.length;
        await tourGuide.save();
        res.status(200).json({ message: 'Rating submitted successfully', tourGuide });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//to add a comment on  a tourGuide
const commentOnTourGuide = async (req, res) => {
    const tourGuideId = req.params.id;
    const touristId = req.user._id;
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ error: 'Comment is required' });
    }
    if (!touristId) {
        return res.status(400).json({ error: 'TouristId is required' });
    }
    if (!comment && !touristId) {
        return res.status(400).json({ error: 'TouristId and comment  is required' });
    }

    try {
        const tourGuide = await TourGuide.findById(tourGuideId);

        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }

        tourGuide.comments.push({ touristId, comment });
        //this line saves the updated tourGuide document(with new comment) back to database 
        await tourGuide.save();
        res.status(200).json({ message: ' Comment added successfully', tourGuide });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//rate an Itinerary made by the tourGuide i followed
const rateItinerary = async (req, res) => {
    const itineraryId = req.params.id;
    const touristId = req.user._id;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Ratings must be between 1 and 5' });
    }
    try {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });

        }
        const existingRating = itinerary.ratings.findIndex(r => r.touristId === touristId);
        if (existingRating !== -1) {
            itinerary.ratings[existingRating].rating = rating;
        } else {
            itinerary.ratings.push({ touristId, rating });
        }
        // Update the average rating *********
        const totalRatings = itinerary.ratings.reduce((acc, r) => acc + r.rating, 0);
        itinerary.rating = totalRatings / itinerary.ratings.length;

        await itinerary.save();
        res.status(200).json({ message: 'Rating submitted successfully', itinerary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
//comment on an itinerary
const commentOnItinerary = async (req, res) => {
    const itineraryId = req.params.id;
    const touristId = req.user._id;
    const { comment } = req.body;

    if (!comment) {
        res.status(400).json({ error: 'Comment is required' });
    }

    try {
        const itinerary = await Itinerary.findById(itineraryId);

        if (!itinerary) {
            res.status(404).json({ error: 'no itinerary found by this id' });
        }
        itinerary.comments.push({ touristId, comment });
        await itinerary.save();
        res.status(200).json({ message: 'Comment added successfully', itinerary });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
    uploadPhoto,
    getPhoto,
    getTourGuideId,
    createItinerary,
    readItinerary,
    updateItinerary,
    deleteItinerary,
    readItineraryById,
    myCreatedItineraries,
    activateItinerary,
    deactivateItinerary,
    rateTourGuide,
    commentOnTourGuide,
    rateItinerary,
    commentOnItinerary
};