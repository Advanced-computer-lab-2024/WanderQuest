const User = require('../models/userModel').User;
const Tourist = require('../models/userModel').Tourist;
const TourGuide = require('../models/userModel').TourGuide;
const Advertiser = require('../models/userModel').Advertiser;
const Seller = require('../models/userModel').Seller;
const Admin = require('../models/adminModel');
const TourGoverner = require('../models/tourGovernerModel');
const Booking = require('../models/bookingModel');
const Activity = require('../models/objectModel').Activity;
const Itinerary = require('../models/objectModel').itinerary;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { Types } = require('mongoose');

// Collection name in MongoDB
const collectionName = 'uploads';

// Create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

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

const upload = multer({ storage }).array('documents', 5);

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the role is valid and create a new user
        let user;
        switch (role) {
            case 'tourist':
                user = await Tourist.signup(username, email, password, role, req.body.nationality, req.body.mobileNumber, req.body.dob, req.body.job);
                break;
            case 'tourGuide':
                user = await TourGuide.signup(username, email, password, role);
                break;
            case 'advertiser':
                user = await Advertiser.signup(username, email, password, role);
                break;
            case 'seller':
                user = await Seller.signup(username, email, password, role);
                break;
            default:
                return res.status(400).json({ error: 'Invalid role' });
        }

        // Create a token
        const token = createToken({ _id: user._id });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.json({ role: user.role, email: user.email, id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            user = await Admin.findOne({ username });
        }

        if (!user) {
            user = await TourGoverner.findOne({ username });
        }

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Create a token
        const token = createToken({ _id: user._id });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.json({ role: user.role, email: user.email, id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// get user
const getUser = async (req, res) => {
    const id = req.user._id;

    try {
        let user = await User.findById(id);

        if (!user) {
            user = await Admin.findById(id);
        }
        if (!user) {
            user = await TourGoverner.findById(id);
        }
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

}

// upload required documents for acceptance
const uploadDocuments = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const user = await User.findById(req.user._id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const documentMetadata = req.files.map(file => ({
                filename: file.filename,
                contentType: file.contentType,
                fileID: file.id
            }));

            user.documents = documentMetadata;
            await user.save();

            res.json({ message: 'Documents uploaded successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

// retrieve documents
const getUserDocuments = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const documents = user.documents;

        if (!documents || documents.length === 0) {
            return res.status(404).json({ error: 'No documents found' });
        }

        // Send the file metadata as JSON
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get all users that request to be accepted
const getUsersRequestingAcceptance = async (req, res) => {
    try {
        const users = await User.find({ accepted: false, rejected: false });

        if (!users) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDocumentByFileID = async (req, res) => {
    try {
        // Convert req.params.id to ObjectId
        const fileID = new Types.ObjectId(req.params.id);

        // Stream the file from MongoDB GridFS
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads', // Ensure this matches your GridFS bucket name
        });

        const downloadStream = bucket.openDownloadStream(fileID);

        // Set headers for download
        downloadStream.on('file', (file) => {
            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
        });

        // Pipe the download stream to the response
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            res.status(500).json({ error: err.message });
        });

        downloadStream.on('end', () => {
            res.end();
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// change password using the old password
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const userId = req.user._id;

        console.log(userId);

        let user = await User.findById(userId);

        console.log(user);

        if (!user) {
            user = await Admin.findById(userId);
        }

        if (!user) {
            user = await TourGoverner.findById(userId);
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordCorrect) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// accept user, takes boolean value accepted
const acceptUser = async (req, res) => {
    const { accepted } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (accepted) {
            user.accepted = true;
        }
        else {
            user.rejected = true;
        }

        await user.save();

        res.json({ message: 'User accepted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// accept terms and conditions
const acceptTerms = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.isTermsAccepted = true;
        await user.save();

        res.json({ message: 'Terms and conditions accepted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function requestAccountDeletion(req, res) {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user._id;
        const currentDate = new Date();

        // Find all itineraries created by the user with upcoming dates
        const itineraries = await Itinerary.find({
            createdBy: userId,
            availableDates: { $gte: currentDate }
        }).distinct('_id');

        // Find all activities created by the user with upcoming dates
        const activities = await Activity.find({
            createdBy: userId,
            date: { $gte: currentDate }
        }).distinct('_id');

        // Check for paid bookings associated with these itineraries and activities
        const paidBookings = await Booking.find({
            $or: [
                { itineraryId: { $in: itineraries }, paid: true },
                { activityId: { $in: activities }, paid: true }
            ]
        });

        if (paidBookings.length > 0) {
            return res.status(400).json({ message: 'You have paid bookings. Please cancel them before requesting account deletion.' });
        }

        user.requestToBeDeleted = true;
        await user.save();

        return res.status(200).json({ message: 'Account deletion requested successfully.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}

module.exports = { getUser, uploadDocuments, getUserDocuments, getUsersRequestingAcceptance, getDocumentByFileID, changePassword, registerUser, acceptUser, acceptTerms, requestAccountDeletion, login };