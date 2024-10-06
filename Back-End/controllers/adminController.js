const AdminModel = require('../models/adminModel');
const { User } = require('../models/userModel');
const tourGovModel = require('../models/tourGovernerModel');
const ProdModel = require('../models/objectModel').Product; 
const CategoryModel = require('../models/objectModel').ActivityCategory; 
const TagModel = require('../models/objectModel').PrefTag;
const mongoose = require('mongoose');

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
const getUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error:error.message})
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
};
//Admin getProducts
const getProducts = async (req,res)=>{
    try {
        const products = await ProdModel.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
//Admin getProdById
const getProdById = async(req,res)=>{
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
    const {name,picture,price,description,seller,ratings,rating,reviews,availableAmount} = req.body;

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

        const product = await ProdModel.create({name,picture,price,description,seller,ratings,rating,reviews,availableAmount})
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
};

//add Category
const addCategory = async (req,res)=>{
  const { category} = req.body;
  if(!category){
    return res.status(400).json({error: 'Category must be entererd'});
  }
  try {
    let createdCategory = await CategoryModel.findOne({category});
    if(createdCategory){
        return res.status(400).json({error:'Category Already Exists'})
    }
    createdCategory = await CategoryModel.create({category});
    res.status(200).json(createdCategory)
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};
const editCategory = async (req,res)=>{
    const {id} = req.params;
    let updatedCategory = await CategoryModel.findById(id)
    if(!updatedCategory){
        res.status(400).json({error:'Category not found'})
    }else{
        try {
            updatedCategory = await CategoryModel.findByIdAndUpdate(id,req.body)
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
};
const getCategories = async (req,res)=>{
    try {
        const categories = await CategoryModel.find({})
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
const deleteCategory = async (req,res)=>{
    const{id} = req.params;
    let deletedCategory = await CategoryModel.findById(id);
    if(!deletedCategory){
        res.status(400).json({error:'Category not found.'});
    }else{
        try {
            deletedCategory = await CategoryModel.findByIdAndDelete(id)
            res.status(200).json({message:'Category was deleted',deletedCategory});
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
};



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
    const { type } = req.body;
    const validTypes = ["historic areas", "beaches", "family-friendly", "shopping", "budget-friendly"];

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }
    if (!validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({ error: 'Type is not valid', "Valid Types": validTypes });
    }
    else{
        try {
            const existingTag = await TagModel.findOne({ type}); // Correct model usage
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
const updateTag = async (req,res)=>{
    const { id} = req.params;
    let updatedTag = await TagModel.findById(id);
    if(!updatedTag){
        res.status(400).json({error:'Place not found'})
    }else{
        try {
            updatedTag = await TagModel.findByIdAndUpdate(id,req.body)
            res.status(200).json(updatedTag);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
};
const deleteTag = async (req,res)=>{
    const { id} = req.params;
    let deletedTag = await TagModel.findById(id);
    if(!deletedTag){
        res.status(400).json({error:'Place not found'})
    }else{
        try {
            deletedTag = await TagModel.findByIdAndDelete(id,req.body)
            res.status(200).json({message:'Tag was Deleted',deletedTag});
        } catch (error) {
            res.status(400).json({error:error.message});
        }
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
    deleteTag
}