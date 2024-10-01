const AdminModel = require('../models/Admin')
const mongoose = require('mongoose')

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find({})
        res.status(200).json(admins)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

// Delete account off system

// Add another admin
const addAdmin = async (req, res) => {
    const {username, password} = req.body;

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

        const admin = await AdminModel.create({username, password})
        res.status(200).json(admin)

    } catch(error){
        res.status(400).json({error:error.message})
    }
}

//Add tourism governer

module.exports = {
    getAllAdmins,
    addAdmin
}