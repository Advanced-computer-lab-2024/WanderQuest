const TransportationModel = require('../models/objectModel').transportation;
const AdvertiserModel = require('../models/userModel').Advertiser;

const createTransportation = async (req, res) => {
  const { type, price, departure, arrival, date, bookingAlreadyMade, pickUpLocation, dropOffLocation } = req.body;  
  if(!type || !price || !departure || !arrival || !pickUpLocation || !dropOffLocation){
    return res.status(400).json({message: 'Missing required fields'});
  }
  const id = req.body.createdBy;
  const retAdvertiser = await AdvertiserModel.findById(id);
  if(!retAdvertiser){
    return res.status(400).json({message: 'Advertiser not found'});
  }
  let company = retAdvertiser.companyName;
  if(!company){
    company = 'N/A';
  }
  const newTransportation = new TransportationModel({
    company,
    type,
    price,
    departure,
    arrival,
    date,
    bookingAlreadyMade,
    pickUpLocation,
    dropOffLocation,
    createdBy: id
  });
  newTransportation.save().then((data) => {
    return res.status(201).json(newTransportation);
  }).catch((err) => {
    return res.status(500).json({message: 'Internal server error'});
  });
}

const getAllTransportations = async (req, res) => {
    TransportationModel.find().then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(500).json({message: 'Internal server error'});
    });
}

module.exports = { createTransportation, getAllTransportations };