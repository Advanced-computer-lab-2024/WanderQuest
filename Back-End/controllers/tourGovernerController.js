const TagModel = require('../models/objectModel').Tags; 
const PlaceModel = require('../models/objectModel').Places; 
const {default:mongoose} = require('mongoose');


//tourism Governor getAllPlaces
const getAllPlaces = async (req, res) => {
    try {
        const places = await PlaceModel.find({});
        res.status(200).json(places);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//tourism Governor getPlaceById
const getPlaceById = async(req,res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Place ID' });
    }

    try {
        
        const place = await PlaceModel.findById(id);
        
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// tourism Governor add Place
const addPlace = async (req, res) => {
    const { title,description, pictures, location, openingHours, ticketPrices, tags,createdBy } = req.body;

    if (!title||!description || !pictures || !location || !openingHours || !ticketPrices) {
        return res.status(400).json({ error: 'Field is required' });
    }
    // If tags are provided, check if all tags exist in the TagModel
    // If tags are provided, check if all tags exist in the TagModel
    if (tags && tags.length > 0) {
        // Extract the types of the tags from the request
        const tagTypes = tags.map(tag => tag.type);

        // Fetch existing tags from the database
        const existingTags = await TagModel.find({ type: { $in: tagTypes } });

        // Create an array of existing tag types for comparison
        const existingTagTypes = existingTags.map(tag => tag.type);

        // Check if every tag in the request exists in the existing tags
        const allTagsExist = tagTypes.every(type => existingTagTypes.includes(type));

        if (!allTagsExist) {
            return res.status(400).json({ error: 'Some tags do not exist' });
        }}
    try {
        const existingPlace = await PlaceModel.findOne({ description, location }); // Adjusted to check for unique fields
        if (existingPlace) {
            return res.status(400).json({ error: 'Place already exists' });
        }

        const newPlace = await PlaceModel.create({title, description, pictures, location, openingHours, ticketPrices, tags,createdBy });
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
//tourism Gorevrnor myCreated
const myCreatedPlaces = async (req,res)=>{
    const myID = req.query.myID;
    if(myID){
        const myPlaces = await PlaceModel.find({createdBy: myID});
        res.status(200).json(myPlaces);
    }else{
        res.status(400).json({error:'UserID is required'})
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
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }
    if (!(type.toLowerCase() === "monument" || "museum" || "religious site" || "palace" || "castle")){
        return res.status(400).json({ error: 'Type is not valid', "Valid Types": ["Monument", "Museum", "Religious Site", "Palace", "Castle"]});
    }else{

    try {
        const existingTag = await TagModel.findOne({ type}); // Correct model usage
        if (existingTag) {
            return res.status(400).json({ error: 'Tag already exists' });
        }

        const newTag = await TagModel.create({ type });
        res.status(200).json(newTag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }}
};


module.exports = {
    addPlace,
    getAllPlaces,
    getPlaceById,
    myCreatedPlaces,
    updatePlace,
    deletePlace,
    createTag,
    getAllTags
}