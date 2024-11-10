const { Seller } = require('../models/userModel');
const multer = require('multer');
const mongoose = require('mongoose');
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

// Read Seller profile
const getProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        if (!seller.accepted) {
            return res.status(403).json({ error: 'Seller account not yet accepted' });
        }
        if(!seller.isTermsAccepted){
            return res.status(403).json({ error: 'Seller account not yet accepted terms and conditions' });
        }
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Seller profile
const updateProfile = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        if (!seller.accepted) {
            return res.status(403).json({ error: 'Seller account not yet accepted' });
        }
        if (!seller.isTermsAccepted) {
            return res.status(403).json({ error: 'Seller account not yet accepted terms and conditions' });
        }
        const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSeller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// upload logo
const uploadLogo = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const seller = await Seller.findById(req.params.id);
            if (!seller) {
                return res.status(404).json({ error: 'Seller not found' });
            }
            if (!seller.accepted) {
                return res.status(403).json({ error: 'Seller account not yet accepted' });
            }
            if (!seller.isTermsAccepted) {
                return res.status(403).json({ error: 'Seller account not yet accepted terms and conditions' });
            }

            const file = req.files[0];

            const documentMetadata = {
                filename: file.filename,
                contentType: file.contentType,
                fileID: file.id
            };

            seller.logo = documentMetadata;

            await seller.save();

            res.json({ message: 'Logo uploaded' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}

const getLogo = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        if (!seller.accepted) {
            return res.status(403).json({ error: 'Seller account not yet accepted' });
        }
        if (!seller.isTermsAccepted) {
            return res.status(403).json({ error: 'Seller account not yet accepted terms and conditions' });
        }

        const logo = seller.logo;

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

// get the first seller id
const getSellerId = async (req, res) => {
    try {
        const seller = await Seller.findOne({});
        res.json(seller._id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//seller getProducts
const getProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
//seller getAvailableProducts
const getAvailableProducts = async (req, res) => {
    try {
        const products = await ProdModel.find({ availableAmount: { $gt: 0 } }, { availableAmount: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//seller addProduct
const addProduct = async (req, res) => {
    const { name, picture, price, description, seller, ratings, rating, reviews, availableAmount,sales } = req.body;

    // Validate input
    if (!name || !picture || !description || !price) {
        return res.status(400).json({ error: 'Details and prices fields are required' });
    }
    try {
        // Checking if the username already exists
        const existingProduct = await ProdModel.findOne({ name, price });

        if (existingProduct) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        const product = await ProdModel.create({ name, picture, price, description, seller, ratings, rating, reviews, availableAmount,sales })
        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

};
const editProduct = async (req, res) => {
    const { id } = req.params;
    let updatedProd = await ProdModel.findById(id)
    if (!updatedProd) {
        res.status(400).json({ error: 'Product not found' })
    } else {
        try {
            updatedProd = await ProdModel.findByIdAndUpdate(id, req.body)
            res.status(200).json(updatedProd);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

//seller can archive or unarchive products
const archiveProduct = async (req,res) => {
    try{
        const  productId = req.params.id;
        const product = await ProdModel.findByIdAndUpdate(productId, { isArchived: true }, { new: true });
        if (!product){ 
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product archived successfully', product });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
const unarchiveProduct = async (req,res) => {
    try{
        const  productId = req.params.id;
        const product = await ProdModel.findByIdAndUpdate(productId, { isArchived: false }, { new: true });
        if (!product){ 
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product unarchived successfully', product });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
//view available quantity and sales
const viewProductSales = async (req,res) => {
    try{
        const products = await ProdModel.find({}, "name availableAmount sales" );
        res.status(200).json(products);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
module.exports = { getProfile, updateProfile, uploadLogo, getLogo, getSellerId, getProducts, addProduct, editProduct, getAvailableProducts,archiveProduct,unarchiveProduct,viewProductSales };