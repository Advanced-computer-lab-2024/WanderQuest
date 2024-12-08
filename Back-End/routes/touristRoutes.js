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
    cancelOrder,
    beNotified,
    bookingIsOpenReminder,
    seenNotifications,
    myNotifications,
    clearNotifications,
    deleteNotification,
    bookingNotification,
    addDeliveryAddress,
    getDeliveryAddresses,
    setActiveDeliveryAddress,
    addToCart,
    viewCart,
    removeFromCart,
    changeAmountInCart,
    birthDaycode
} = require('../controllers/touristController');
const { getProducts } = require('../controllers/adminController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


// requests that do not require authentication
router.get("/products", getProducts)

router.get('/upcomingItineraries', getUpcomingItineraries);
router.get('/upcomingActivities', getUpcomingActivities);
router.get('/upcomingPlaces', getAllPlaces);


// require auth for all tourist routes
router.use(requireAuth({ role: 'tourist' }));

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/availableProducts', getAvailableProducts);

// Sharing activity via link or email
router.get('/upcomingActivities/:id', getActivityById);

// Sharing activity via link or email
router.get('/upcomingItineraries/:id', getItineraryById);

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

router.get("/orders", viewOrders)
router.post("/orders/issue", issueAnOrder)
router.patch("/orders/cancel/:id", cancelOrder)
router.patch("/beNotified/:id", beNotified)
router.post('/savedReminder', bookingIsOpenReminder);
router.get('/notifs', myNotifications);
router.patch('/notifs', seenNotifications);
router.delete('/notifications', clearNotifications);
router.delete('/notification/:id', deleteNotification);
router.post('/bookingReminder', bookingNotification);
router.post('/addDeliveryAddresses', addDeliveryAddress);
router.get('/deliveryAddresses', getDeliveryAddresses);
router.patch('/setActiveDeliveryAddress', setActiveDeliveryAddress);
router.post('/birthday', birthDaycode);

router.post('/cart/add', addToCart);
router.get('/cart', viewCart);
router.delete('/cart/remove', removeFromCart);
router.patch('/cart/change', changeAmountInCart);

module.exports = router;