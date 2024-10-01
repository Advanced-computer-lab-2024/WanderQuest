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
    try {
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