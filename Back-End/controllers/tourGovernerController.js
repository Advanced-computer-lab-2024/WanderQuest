const TagModel = require('../models/objectModel').Tags; 
const PlaceModel = require('../models/objectModel').Places; 
const mongoose = require('mongoose');


//tourism Governor getAllPlaces
const getAllPlaces = async (req, res) => {
    try {
        const places = await PlaceModel.find({});
        res.status(200).json(places);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// tourism Governor add Place
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

//tourism Governor update Place
const updatePlace = async (req, res)=> {
    const {id} = req.params;
    let updatedPlace = await PlaceModel.findById(id)
    if(!updatedPlace){
        res.status(400).json({error:'Place not found'})
    }else{
        try {
            updatedPlace = await PlaceModel.findByIdAndUpdate(id,req.body)
            res.status(200).json(updatedPlace);
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }
};

//tourism Governor deletePlace
const deletePlace = async (req,res)=>{
    const{id} = req.params;
    let deletedPlace = await PlaceModel.findById(id);
    if(!deletedPlace){
        res.status(400).json({error:'Place not found.'});
    }else{
        try {
            deletedPlace = await PlaceModel.findByIdAndDelete(id)
            res.status(200).json({message:'Place was deleted',deletedPlace});
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }

};

// tourism Governor getAllTags
const getAllTags = async (req, res) => {
    try {
        const tags = await TagModel.find({});
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// tourism Governor createTag
const createTag = async (req, res) => {
    const { type, historicalPeriod } = req.body;

    if (!type || !historicalPeriod) {
        return res.status(400).json({ error: 'Type and Historical Periods are required' });
    }
    if (!(type.toLowerCase() === "monument" || "museum" || "religious site" || "palace" || "castle")){
        return res.status(400).json({ error: 'Type is not valid', "Valid Types": ["Monument", "Museum", "Religious Site", "Palace", "Castle"]});
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
    addPlace,
    getAllPlaces,
    updatePlace,
    deletePlace,
    createTag,
    getAllTags
}