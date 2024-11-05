const express = require('express');

// controller functions
const {
    getProfile,
    updateProfile,
    uploadPhoto,
    getPhoto,
    getTourGuideId
} = require('../controllers/tourGuideController');

// const requireAuth = require('../middleware/requireAuth');
const {
    createItinerary,
    readItinerary,
    updateItinerary,
    deleteItinerary,
    readItineraryById,
    myCreatedItineraries,
    activateItinerary,
    deactivateItinerary
} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

// // require auth for all tour guide routes
// router.use(requireAuth({ role: 'tourGuide' }));

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.post('/uploadPhoto/:id', uploadPhoto);
router.get('/photo/:id', getPhoto);
router.get('/tourGuideId', getTourGuideId);
router.post('/create', createItinerary);
router.get('/itineraries', readItinerary);
router.get('/itineraries/:id', readItineraryById);
router.get('/myItineraries/:id', myCreatedItineraries);
router.put('/itineraries/:id', updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
router.patch('/itinerary/activate/:id', activateItinerary);
router.patch('/itinerary/deactivate/:id', deactivateItinerary);
module.exports = router;