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
    rateProduct,
    changePreferredCurrency,
    redeemPoints,
    fileComplaint,
    myComplaints,
    reviewProduct,
    getLevel,
    getavailablePoints,
    getTotalPoints,
    getAllCurrencies
} = require('../controllers/touristController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all tourist routes
router.use(requireAuth({ role: 'tourist' }));

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
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
router.post('/rateProduct/:id', rateProduct);
router.post('/reviewProduct/:id', reviewProduct);
router.get('/currencies', getAllCurrencies);
router.patch('/changePreferredCurrency', changePreferredCurrency);
router.patch('/redeem', redeemPoints);
router.post('/fileComplaint', fileComplaint);
router.get('/myComplaints', myComplaints);
router.get('/level', getLevel)
router.get('/availablePoints', getavailablePoints)
router.get('/totalPoints', getTotalPoints)

router.get("/products", getProducts)
module.exports = router;