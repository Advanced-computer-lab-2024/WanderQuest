// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();
//routes
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
router.get('/itineraries/:id', readItineraryById);


module.exports = router;
