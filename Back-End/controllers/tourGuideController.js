const mongoose = require('mongoose'); 
const { Activity } = require('../models/objectModel');
const TourGuide = require('../models/userModel').TourGuide;
const Itinerary =require('../models/objectModel').itinerary;

// functions
const getProfile = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.user.id);
        res.json(tourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//myCreatedItineraries
const myCreatedItineraries = async (req,res)=>{
    const myID = req.query.myID;
    if(myID){
        const myItineraries = await Itinerary.find({createdBy: myID});
        res.status(200).json(myItineraries);
    }else{
        res.status(400).json({error:'UserID is required'})
    }

};

const updateProfile = async (req, res) => {
    try {
        const updatedTourGuide = await TourGuide.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedTourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//create an itinerary 
const createItinerary = async (req,res) => {
    const{ 
        activities,
        locations,
        timeline,
        duration,
        language,
        price,
        availableDates,
        time,
        accessibility,
        pickUpLocation,
        dropOffLocation,
        tags,
        BookingAlreadyMade,
        createdBy} = req.body;
    
        try{

            for (const activityId of activities) {
                const activityFound = await Activity.findById(activityId);
                if (!activityFound) {
                    return res.status(404).json({ message: `Activity with ID ${activityId} not found.` });
                }
            }
    
           const newItinerary = await Itinerary.create({
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            availableDates,
            time,
            accessibility,
            pickUpLocation,
            dropOffLocation,
            tags,
            BookingAlreadyMade,
            createdBy
           });
           res.status(200).json(newItinerary);
        }catch(error){

            res.status(404).json({error: error.message});
        }
}

//Read an itinerary
const readItinerary = async (req,res) =>{
    try{
        const itineraries = await Itinerary.find({})
                              .populate({
                                path: 'activities',
                                model: 'Activity',
                                select: 'title date time location price priceRange category tags specialDiscounts bookingIsOpen -_id',
                               }).sort({createdAt: -1});
        res.status(200).json(itineraries);

    }catch(error){
       res.status(404).json({error: error.message});
    }
}

//update an itinerary
const updateItinerary = async (req,res) => {
    const{ id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Wrong ID format' });
    }

    try{
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id,req.body,{new: true}).populate('activities');
        if(!updatedItinerary){
            return res.status(404).json({error: 'No such itinerary'});
        }
        res.status(200).json(updatedItinerary);

    }catch(error){
        res.status(404).json({error: error.message});
    }
}

//delete an itinerary
const deleteItinerary = async (req,res) => {
    const{ id }= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such itinerary' });
    }

    try{
        let itinerary = await Itinerary.findById({_id: id});
        
        if (!itinerary) {
            return res.status(404).json({ error: 'No such itinerary found' });
        }

        if (itinerary.BookingAlreadyMade) {
            return res.status(400).json({ error: "Itinerary can't be deleted, bookings already made." });
        }
         itinerary = await Itinerary.findByIdAndDelete({_id: id});
        res.status(200).json({ message: 'Itinerary deleted successfully.' ,itinerary});
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

module.exports = { getProfile, updateProfile,createItinerary,readItinerary,updateItinerary,deleteItinerary,myCreatedItineraries };