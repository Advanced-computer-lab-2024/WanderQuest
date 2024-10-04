// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();
//routes
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);


module.exports = router;
