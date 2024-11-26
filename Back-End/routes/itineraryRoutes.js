// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById,myCreatedItineraries,rateItinerary,commentOnItinerary} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');


//routes
router.post('/create', requireAuth({ role: 'tourGuide' }), createItinerary);
router.get('/itineraries', readItinerary);
router.get('/myItineraries',myCreatedItineraries);
router.put('/itineraries/:id',updateItinerary);
router.delete('/itineraries/:id', deleteItinerary);
router.get('/itineraries/:id', readItineraryById);
router.post('/rate/:id', requireAuth({role: "tourist"}), rateItinerary);
router.post('/comment/:id', requireAuth({role: "tourist"}), commentOnItinerary);

module.exports = router;
