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
    getAllCurrencies,
    saveEvent,
    viewSavedEvents,
    removeSavedEvents,
    addToWishlist,
    viewWishlist,
    removeFromWishlist,
    issueAnOrder,
    viewOrders,
    cancelOrder
} = require('../controllers/touristController');
const {getProducts} = require('../controllers/adminController')
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

router.post('/saveEvent', saveEvent);
router.get('/viewSavedEvents', viewSavedEvents);
router.delete('/removeSavedEvents', removeSavedEvents);

router.post('/wishlist/add', addToWishlist);
router.get('/wishlist', viewWishlist);
router.delete('/wishlist/remove', removeFromWishlist);

router.get("/products", getProducts)

router.get("/orders", viewOrders)
router.post("/orders/issue", issueAnOrder)
router.patch("/orders/cancel/:id", cancelOrder)




module.exports = router;