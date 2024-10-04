// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,myCreatedItineraries} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();
//routes
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.get('/myItineraries',myCreatedItineraries);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);


module.exports = router;
