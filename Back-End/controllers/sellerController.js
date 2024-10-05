const { Seller } = require('../models/userModel');

// Read Seller profile
const getProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.user.id);
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Seller profile
const updateProfile = async (req, res) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedSeller);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
//seller addProduct

const addProduct = async (req,res)=>{
    const {name,picture,price,description,seller,ratings,reviews,availableAmount} = req.body;

    // Validate input
    if (!name || !picture || !description  || !price || !availableAmount) {
        return res.status(400).json({ error: 'Details and prices and available amount fields are required' });
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

module.exports = { getProfile, updateProfile,getProducts,addProduct,editProduct };