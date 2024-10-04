const mongoose = require('mongoose'); // Add this line at the top of your file
const Advertiser = require('../models/userModel').Advertiser;
const ActivityModel = require('../models/objectModel').Activity;

// functions
const getProfile = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.user.id);
        res.json(advertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedAdvertiser = await Advertiser.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedAdvertiser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//create activity
const createActivity = async (req,res) => {
    const {title , date, time, location, price, priceRange, category, tags, specialDiscounts, bookingIsOpen} = req.body;
    console.log(req.user); // Check if req.user is set

    try{
        const newActivity = await ActivityModel.create({title,date,time,location,price,priceRange,category,tags,specialDiscounts,bookingIsOpen,
            
            });
            res.status(200).json(newActivity);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}


//Read the activity    ????sure without body?????????????????????
const readActivities = async (req,res) => {
   try{

    const allActivities = await ActivityModel.find({}).sort({createdAt:-1});
    if (!allActivities.length) {
        // console.log("No activities found for user:", req.user.id); // Debugging statement

        // Respond with an empty array if no activities are found
        return res.status(200).json([]);
    }
    
    console.log("Activities found:", allActivities); // Debugging statement

    res.status(200).json(allActivities);
   }catch(error){
    console.error("Error fetching activities:", error.message);

    res.status(404).json({error: error.message});
   }
}


//Update An Activity
const updateActivity = async (req,res) => {
    const{id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const theUpdatedActivity = await ActivityModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(theUpdatedActivity)

        // const theUpdatedActivity = await ActivityModel.findOneAndUpdate({_id: id},{
        //     ...req.body
        //  })
         
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

//Delete Activity
const deleteActivity = async (req,res) => {
  const{ id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such ID'})
}

  try{

    const deleteAnActivityD = await ActivityModel.findById(id);
    if(!deleteAnActivityD){
        return res.status(200).json({message: 'This activity is not found to be deleted'});

    }
    const deleteAnActivity = await ActivityModel.findByIdAndDelete(id);
    if(!deleteActivity){
        res.status(200).json({message: 'This activity is not found to be deleted'});

    }
    res.status(200).json({message: 'Successfully Deleted',deleteAnActivity});
    
  }catch(error){
    res.status(404).json({error: error.message});
  }

}

//to get the advertisers
const getAllAdvertisers = async (req, res) => {
    try {
        const advertisers = await Advertiser.find({});
        res.status(200).json(advertisers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProfile, updateProfile, createActivity, readActivities, updateActivity, deleteActivity, getAllAdvertisers };

