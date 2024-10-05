const express = require('express');

// controller functions
const { getProfile, updateProfile } = require('../controllers/tourGuideController');
const requireAuth = require('../middleware/requireAuth');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById,myCreatedItineraries} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

// require auth for all tour guide routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.get('/itineraries/:id',readItineraryById);
router.get('/myItineraries',myCreatedItineraries);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
module.exports = router;