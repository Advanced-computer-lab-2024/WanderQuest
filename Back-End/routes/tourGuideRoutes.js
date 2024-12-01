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
    deactivateItinerary,
    rateTourGuide,
    commentOnTourGuide} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();
const requireAuth = require('../middleware/requireAuth');


// routes
router.get('/profile', requireAuth({role: "tourGuide"}), getProfile);
router.put('/profile', requireAuth({role: "tourGuide"}), updateProfile);
router.post('/uploadPhoto', requireAuth({role: "tourGuide"}), uploadPhoto);
router.get('/photo', requireAuth({role: "tourGuide"}), getPhoto);
router.post('/create', requireAuth({role: "tourGuide"}), createItinerary);
router.get('/itineraries', readItinerary);
router.get('/itineraries/:id', readItineraryById);
router.get('/myItineraries', requireAuth({role: "tourGuide"}), myCreatedItineraries);
router.put('/itineraries/:id', requireAuth({role: "tourGuide"}), updateItinerary);
router.delete('/itineraries/:id', requireAuth({role: "tourGuide"}), deleteItinerary);
router.patch('/itinerary/activate/:id', requireAuth({role: "tourGuide"}), activateItinerary);
router.patch('/itinerary/deactivate/:id', requireAuth({role: "tourGuide"}), deactivateItinerary);
router.post('/rate/:tourGuideId', requireAuth({role: "tourist"}), rateTourGuide);
router.post('/comment/:id', requireAuth({role: "tourist"}), commentOnTourGuide);
module.exports = router;