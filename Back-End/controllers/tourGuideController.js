const mongoose = require('mongoose');
const { Activity } = require('../models/objectModel');
const TourGuide = require('../models/userModel').TourGuide;
const Itinerary = require('../models/objectModel').itinerary;

// functions
const getProfile = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }
        if (!tourGuide.accepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted' });
        }
        res.json(tourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findById(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }
        if (!tourGuide.accepted) {
            return res.status(403).json({ error: 'Tour guide account not yet accepted' });
        }
        const updatedTourGuide = await TourGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTourGuide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get the id of the first tour guide
const getTourGuideId = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findOne({});
        res.json(tourGuide._id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//myCreatedItineraries
const myCreatedItineraries = async (req, res) => {
    if (req.params.id) {
        const myItineraries = await Itinerary.find({ createdBy: req.params.id });
        res.status(200).json(myItineraries);
    } else {
        res.status(400).json({ error: 'UserID is required' })
    }

};


//create an itinerary 
const createItinerary = async (req, res) => {
    const {
        title,
        activities,
        locations,
        timeline,
        duration,
        language,
        price,
        ratings,
        availableDates,
        time,
        accessibility,
        pickUpLocation,
        dropOffLocation,
        tags,
        comments,
        BookingAlreadyMade,
        createdBy } = req.body;

    try {

        for (const activityId of activities) {
            const activityFound = await Activity.findById(activityId);
            if (!activityFound) {
                return res.status(404).json({ message: `Activity with ID ${activityId} not found.` });
            }
        }

        const newItinerary = await Itinerary.create({
            title,
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            ratings,
            availableDates,
            time,
            accessibility,
            pickUpLocation,
            dropOffLocation,
            tags,
            comments,
            BookingAlreadyMade,
            createdBy
        });
        res.status(200).json(newItinerary);
    } catch (error) {

        res.status(404).json({ error: error.message });
    }
}
//read one itinerary
const readItineraryById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid itinerary ID format' });
    }

    try {
        const itinerary = await Itinerary.findById(id).populate({
            path: 'activities',
            model: 'Activity',
            select: 'title date time location price priceRange category tags specialDiscounts ratings comments bookingIsOpen -_id',
        });

        // If itinerary is not found, return an error
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//read itinerary by name

//Read an itinerary
const readItinerary = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({})
            .populate({
                path: 'activities',
                model: 'Activity',
                select: 'title date time location price priceRange category tags specialDiscounts ratings comments bookingIsOpen -_id',
            }).sort({ createdAt: -1 });
        if (!itineraries.length) {
            // Debugging statement

            // Respond with an empty array if no activities are found
            return res.status(200).json({ message: 'No itineraries found' });
        }
        res.status(200).json(itineraries);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//update an itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Wrong ID format' });
    }

    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id, req.body, { new: true }).populate('activities');
        if (!updatedItinerary) {
            return res.status(404).json({ error: 'No such itinerary' });
        }
        res.status(200).json(updatedItinerary);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//delete an itinerary
const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such itinerary' });
    }

    try {
        let itinerary = await Itinerary.findById({ _id: id });

        if (!itinerary) {
            return res.status(404).json({ error: 'No such itinerary found' });
        }

        if (itinerary.BookingAlreadyMade) {
            return res.status(400).json({ error: "Itinerary can't be deleted, bookings already made." });
        }
        itinerary = await Itinerary.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: 'Itinerary deleted successfully.', itinerary });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//Rate a tourGuide
const rateTourGuide = async (req,res) => {
    const { tourGuideId } = req.params;
    const { touristId, rating } = req.body;

    if(rating < 1 || rating > 5 ){
        return res.status(400).json({ error: 'Rating must be between 1 and 5'});
    }

    try{
        const tourGuide = await TourGuide.findById(tourGuideId);

        if(!tourGuide){
            return res.status(404).json({ error: 'Tour guide not found'});
        }
        
        //V.I check if tourist has already rated this tour guide
        const existingRating = tourGuide.ratings.findIndex(r => r.touristId.toString() === touristId);

        if(existingRating !== -1){
            tourGuide.ratings[existingRating].rating = rating;
        }else{
            tourGuide.ratings.push({ touristId , rating});
        }
        
        await tourGuide.save();
        res.status(200).json({message: 'Rating submitted successfully' , tourGuide});

    }catch(error){
        res.status(500).json({ error: error.message});
    }
} 

//to add a comment on  a tourGuide
const commentOnTourGuide = async (req,res) => {
    const  tourGuideId  = req.params.id;
    const { touristId , comment } = req.body;

    if(!comment ){
        return res.status(400).json({ error: 'Comment is required'});
    }
    if(!touristId ){
        return res.status(400).json({ error: 'TouristId is required'});
    }
    if(!comment && !touristId ){
        return res.status(400).json({ error: 'TouristId and comment  is required'});
    }

    try{
        const tourGuide = await TourGuide.findById(tourGuideId);

        if(!tourGuide){
            return res.status(404).json({error: 'Tour guide not found'});
        }
        
        tourGuide.comments.push({touristId, comment});
        //this line saves the updated tourGuide document(with new comment) back to database 
        await tourGuide.save();
        res.status(200).json({message: ' Comment added successfully',tourGuide});
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}

//rate an Itinerary made by the tourGuide i followed
const rateItinerary = async (req,res) => {
    const  itineraryId  = req.params.id;
    const { touristId, rating} = req.body;

    if(rating < 1 || rating > 5){
        return res.status(400).json({error: 'Ratings must be between 1 and 5'});
    }
    try{
        const itinerary = await Itinerary.findById(itineraryId);
        if(!itinerary){
            return res.status(404).json({error: 'Itinerary not found'});

        }
        const existingRating = itinerary.ratings.findIndex(r => r.touristId.toString() === touristId);
        if(existingRating !== -1){
            itinerary.ratings[existingRating].rating = rating;
        }else{
            itinerary.ratings.push({touristId,rating});
        }
        // Update the average rating *********
        const totalRatings = itinerary.ratings.reduce((acc, r) => acc + r.rating, 0);
        itinerary.rating = totalRatings / itinerary.ratings.length;

        await itinerary.save();
        res.status(200).json({message: 'Rating submitted successfully',itinerary});
    }catch(error){
        res.status(500).json({error: error.message});
    }
    
}
//comment on an itinerary
const commentOnItinerary = async (req,res) => {
    const  itineraryId  = req.params.id;
    const { touristId,comment } = req.body;

    if(!comment){
        res.status(400).json({error: 'Comment is required'});
    }
    
    try{
        const itinerary = await Itinerary.findById(itineraryId);

        if(!itinerary){
            res.status(404).json({error: 'no itinerary found by this id'});
        }
        itinerary.comments.push({touristId, comment});
        await itinerary.save();
        res.status(200).json({ message: 'Comment added successfully',itinerary});
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

module.exports = { getProfile, updateProfile, getTourGuideId,createItinerary, readItinerary, updateItinerary, deleteItinerary, readItineraryById, myCreatedItineraries,rateTourGuide,commentOnTourGuide,rateItinerary,commentOnItinerary };