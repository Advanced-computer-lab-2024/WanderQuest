// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById,myCreatedItineraries,rateItinerary,commentOnItinerary} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

//routes
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.get('/myItineraries',myCreatedItineraries);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
router.get('/itineraries/:id', readItineraryById);
router.post('/rate/:id', rateItinerary);
router.post('/comment/:id',commentOnItinerary);

module.exports = router;
