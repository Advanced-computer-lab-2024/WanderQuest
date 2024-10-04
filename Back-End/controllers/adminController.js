const AdminModel = require('../models/adminModel');
const { User } = require('../models/userModel');
const tourGovModel = require('../models/tourGovernerModel');
const ProdModel = require('../models/objectModel').Product; 
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
const deleteAccount = async (req, res) => {
    const { id } = req.params;

    // Validate input
    let userAccount = await User.findOne({ _id: id });
    let tourGovAccount = await tourGovModel.findOne({ _id: id });

    if (!userAccount && !tourGovAccount) {
        return res.status(400).json({ error: 'Account not found' });
    }

    try {
        if(userAccount){
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
//Admin getProducts
const getProducts = async (req,res)=>{
    try {
        const products = await ProdModel.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
//Admin getAvailableProducts
const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 } }, { availableAmount: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//Admin addProduct

const addProduct = async (req,res)=>{
    const {name,picture,price,description,seller,ratings,reviews,availableAmount} = req.body;

    // Validate input
    if (!name || !picture || !description  || !price ) {
        return res.status(400).json({ error: 'Details and prices fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingProduct = await ProdModel.findOne({ name,price});

        if (existingProduct) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        const product = await ProdModel.create({name,picture,price,description,seller,ratings,reviews,availableAmount})
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

};
const editProduct = async (req,res)=>{
    const {id} = req.params;
    let updatedProd = await ProdModel.findById(id)
    if(!updatedProd){
        res.status(400).json({error:'Product not found'})
    }else{
        try {
            updatedProd = await ProdModel.findByIdAndUpdate(id,req.body)
            res.status(200).json(updatedProd);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
}

// Add a Tourism Governer
const addTourGov = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'});
    }
    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    if (password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' });
    }
    try {
        // Checking if the username already exists
        let tourGov = await tourGovModel.findOne({ username });

        if (tourGov) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        tourGov = await tourGovModel.create({ username, password })
        res.status(200).json(tourGov)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllAdmins,
    deleteAccount,
    addAdmin,
    addTourGov,
    getProducts,
    addProduct,
    editProduct,
    getAvailableProducts
}