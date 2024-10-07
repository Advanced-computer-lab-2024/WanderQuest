const express = require('express');

// controller functions
const { getProfile, updateProfile, getTourGuideId } = require('../controllers/tourGuideController');
// const requireAuth = require('../middleware/requireAuth');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById,myCreatedItineraries} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

// // require auth for all tour guide routes
// router.use(requireAuth({ role: 'tourGuide' }));

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/tourGuideId', getTourGuideId);
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.get('/itineraries/:id',readItineraryById);
router.get('/myItineraries/:id',myCreatedItineraries);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
module.exports = router;