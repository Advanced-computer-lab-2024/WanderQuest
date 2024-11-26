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

// Tourism Governor add Place
const addPlace = async (req, res) => {
    const createdBy = req.user._id;
    const { title, description, pictures, location, openingHours, ticketPrices, tags } = req.body;

    if (!title || !description || !pictures || !location || !openingHours || !ticketPrices) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const tourGovUser = await User.findById(createdBy);
        if (!tourGovUser) {
            return res.status(400).json({ error: 'User not found' });
        }
        // If tags are provided, check if all tags exist in the TagModel
        if (tags && tags.length > 0) {
            const tagTypes = tags.map(tag => tag.type);
            const existingTags = await TagModel.find({ type: { $in: tagTypes } });
            const existingTagTypes = existingTags.map(tag => tag.type);
            const allTagsExist = tagTypes.every(type => existingTagTypes.includes(type));

            if (!allTagsExist) {
                return res.status(400).json({ error: 'Some tags do not exist' });
            }
        }

        const existingPlace = await PlaceModel.findOne({ description, location });
        if (existingPlace) {
            return res.status(400).json({ error: 'Place already exists' });
        }

        const newPlace = await PlaceModel.create({ title, description, pictures, location, openingHours, ticketPrices, tags, createdBy });
        res.status(200).json(newPlace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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
    const tourGovId = req.user._id;
    const{id} = req.params;
    let deletedPlace = await PlaceModel.findById(id);
    if(!deletedPlace){
        res.status(400).json({error:'Place not found.'});
    }else{
        try {
            if(deletedPlace.createdBy !== tourGovId){
                return res.status(400).json({error:'You are not authorized to delete this place.'});
            }
            deletedPlace = await PlaceModel.findByIdAndDelete(id)
            res.status(200).json({message:'Place was deleted',deletedPlace});
        } catch (error) {
            res.status(400).json({error:error.message});
        }
    }

};

// Tourism Governor myCreatedPlaces
const myCreatedPlaces = async (req, res) => {
    const { id } = req.user._id;

    if (!id) {
        return res.status(400).json({ error: 'UserID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid UserID format' });
    }

    try {
        const myPlaces = await PlaceModel.find({ createdBy: id });
        res.status(200).json(myPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    myCreatedPlaces,
    // other exports
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
    // const validTypes = ["monument", "museum", "religious site", "palace", "castle","shey"];

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }
    // if (!validTypes.includes(type.toLowerCase())) {
    //     return res.status(400).json({ error: 'Type is not valid', "Valid Types": ["Monument", "Museum", "Religious Site", "Palace", "Castle"]});
    // }
    

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