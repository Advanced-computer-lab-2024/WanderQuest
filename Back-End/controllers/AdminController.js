const AdminModel = require('../models/adminModel');
const TagModel = require('../models/objectModel').Tags; 
const PlaceModel = require('../models/objectModel').Places; 
const mongoose = require('mongoose');

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find({})
        res.status(200).json(admins)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete account off system
// WARNING: ONLY TESTED ON ADMIN ACCOUNTS
const deleteAccount = async (req, res) => {
    const { id } = req.params;

    // Validate input
    let account = await AdminModel.findById(id)

    if (!account) {
        return res.status(400).json({ error: 'Account not found' })
    }

    try {
        account = await AdminModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'Account deleted', account })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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

    if (password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    }

    try {
        // Checking if the username already exists
        const existingAdmin = await AdminModel.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const admin = await AdminModel.create({ username, password })
        res.status(200).json(admin)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Add tourism governer
//tourism Governor getAllPlaces
// Get all Places
const getAllPlaces = async (req, res) => {
    try {
        const places = await PlaceModel.find({});
        res.status(200).json(places);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add Place
const addPlace = async (req, res) => {
    const { description, pictures, location, openingHours, ticketPrices, tags } = req.body;

    if (!description || !pictures || !location || !openingHours || !ticketPrices) {
        return res.status(400).json({ error: 'Field is required' });
    }

    try {
        const existingPlace = await PlaceModel.findOne({ description, location }); // Adjusted to check for unique fields
        if (existingPlace) {
            return res.status(400).json({ error: 'Place already exists' });
        }

        const newPlace = await PlaceModel.create({ description, pictures, location, openingHours, ticketPrices, tags });
        res.status(200).json(newPlace);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Tags
const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create Tag
const createTag = async (req, res) => {
    const { type, historicalPeriod } = req.body;

    if (!type || !historicalPeriod) {
        return res.status(400).json({ error: 'Field is required' });
    }

    try {
        const existingTag = await TagModel.findOne({ type, historicalPeriod }); // Correct model usage
        if (existingTag) {
            return res.status(400).json({ error: 'Tag already exists' });
        }

        const newTag = await TagModel.create({ type, historicalPeriod });
        res.status(200).json(newTag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addPlace,
    getAllPlaces,
    createTag,
    getAllTags
}