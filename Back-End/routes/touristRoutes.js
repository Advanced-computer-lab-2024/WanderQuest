const express = require('express');

// controller functions
const { getAllPlaces, getPlaceById } = require('../controllers/tourGovernerController')
const { getAvailableProducts } = require('../controllers/adminController')
const { getProfile, updateProfile, getUpcomingActivities, getUpcomingItineraries } = require('../controllers/touristController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tourist routes
// router.use(requireAuth);

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/availableProducts', getAvailableProducts);
router.get('/upcomingActivities', getUpcomingActivities);
router.get('/upcomingItineraries', getUpcomingItineraries);
router.get('/upcomingPlaces', getAllPlaces);
router.get('/upcomingPlaces/:id', getPlaceById);


module.exports = router;