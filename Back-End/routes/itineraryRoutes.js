// routes/itineraryRoutes.js
const express = require('express');
const { createItinerary ,readItinerary,updateItinerary,deleteItinerary,readItineraryById,myCreatedItineraries,rateItinerary,commentOnItinerary} = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');


//routes
router.post('/create', requireAuth({ role: 'tourGuide' }), createItinerary);
router.get('/itineraries',requireAuth({ role: 'tourGuide' }), readItinerary);
router.get('/myItineraries',requireAuth({ role: 'tourGuide' }),myCreatedItineraries);
router.put('/itineraries/:id',requireAuth({ role: 'tourGuide' }),updateItinerary);
router.delete('/itineraries/:id', requireAuth({ role: 'tourGuide' }),deleteItinerary);
router.get('/itineraries/:id', requireAuth({ role: 'tourGuide' }),readItineraryById);
router.post('/rate/:id', requireAuth({role: "tourist"}), rateItinerary);
router.post('/comment/:id', requireAuth({role: "tourist"}), commentOnItinerary);

module.exports = router;
