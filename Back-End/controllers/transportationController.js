const TransportationModel = require('../models/objectModel').transportation;
const AdvertiserModel = require('../models/userModel').Advertiser;

const createTransportation = async (req, res) => {
  let { company, type, price, departure, arrival, date, bookingAlreadyMade, pickUpLocation, dropOffLocation } = req.body;
  
  if (!type || !price || !departure || !arrival || !pickUpLocation || !dropOffLocation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const id = req.user._id;
  const retAdvertiser = await AdvertiserModel.findById(id);
  company = retAdvertiser.company;
  
  if (!retAdvertiser) {
    return res.status(400).json({ message: 'Advertiser not found' });
  }
  
  if (!company) {
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
    return res.status(500).json({ message: err.message });
  });
}

const getAllTransportations = async (req, res) => {
  TransportationModel.find().then((data) => {
    return res.status(200).json(data);
  }).catch((err) => {
    return res.status(500).json({ message: 'Internal server error' });
  });
}

module.exports = { createTransportation, getAllTransportations };