const express = require('express');

// controller functions
const { getAllPlaces, getPlaceById } = require('../controllers/tourGovernerController')
const { getAvailableProducts } = require('../controllers/adminController')
const {
    getProfile,
    updateProfile,
    getUpcomingActivities,
    getActivityById,
    getItineraryById,
    getUpcomingItineraries,
    getTouristId,
    rateProduct,
    changePreferredCurrency,
    redeemPoints,
    fileComplaint,
    myComplaints,
    getLevel
} = require('../controllers/touristController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tourist routes
// router.use(requireAuth);

// routes
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/touristId', getTouristId);
router.get('/availableProducts', getAvailableProducts);
router.get('/upcomingActivities', getUpcomingActivities);

// Sharing activity via link or email
router.get('/upcomingActivities/:id', getActivityById);

router.get('/upcomingItineraries', getUpcomingItineraries);

// Sharing activity via link or email
router.get('/upcomingItineraries/:id', getItineraryById);

router.get('/upcomingPlaces', getAllPlaces);

// Sharing activity via link or email
router.get('/upcomingPlaces/:id', getPlaceById);
router.post('/rateProduct/:productId',rateProduct);
router.patch('/changePreferredCurrency/:id', changePreferredCurrency);
router.patch('/redeem/:id',redeemPoints);
router.post('/fileComplaint',fileComplaint);
router.get('/myComplaints/:id',myComplaints);
router.get('/level/:id',getLevel)

module.exports = router;