const express = require('express');

// controller functions
const{getAllPlaces,getPlaceById} = require('../controllers/tourGovernerController')
const{getAvailableProducts} = require('../controllers/adminController')
const { getProfile, updateProfile,getUpcomingActivities,getUpcomingItineraries } = require('../controllers/touristController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tourist routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/availableProducts',getAvailableProducts);
router.get('/upcomingActivities',getUpcomingActivities);
router.get('/upcomingItineraries',getUpcomingItineraries);
router.get('/places',getAllPlaces);
router.get('/places/:id',getPlaceById);


module.exports = router;