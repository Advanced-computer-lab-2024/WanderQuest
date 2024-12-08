const express = require('express');

// controller functions
const {
    getProfile,
    updateProfile,
    uploadPhoto,
    getPhoto,
    getTourGuideId,
    getTourGuideInfo,
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
    commentOnTourGuide,
    myNotifications,
    seenNotifications,
    specificNotification,
    viewSalesReport,
    viewFilterSalesReport,
    viewTouristReport } = require('../controllers/tourGuideController'); // Assuming the controller is in tourGuideController

const {
    readActivities
} = require('../controllers/advertiserController');
const { getAllTags } = require('../controllers/adminController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');


// routes
router.get('/profile', requireAuth({ role: "tourGuide" }), getProfile);
router.put('/profile', requireAuth({ role: "tourGuide" }), updateProfile);
router.post('/uploadPhoto', requireAuth({ role: "tourGuide" }), uploadPhoto);
router.get('/photo', requireAuth({ role: "tourGuide" }), getPhoto);
router.post('/create', requireAuth({ role: "tourGuide" }), createItinerary);
router.get('/itineraries', readItinerary);
router.get('/itineraries/:id', readItineraryById);
router.get('/myItineraries', requireAuth({ role: "tourGuide" }), myCreatedItineraries);
router.put('/itineraries/:id', requireAuth({ role: "tourGuide" }), updateItinerary);
router.delete('/itineraries/:id', requireAuth({ role: "tourGuide" }), deleteItinerary);
router.patch('/itinerary/activate/:id', requireAuth({ role: "tourGuide" }), activateItinerary);
router.patch('/itinerary/deactivate/:id', requireAuth({ role: "tourGuide" }), deactivateItinerary);
router.post('/rate/:tourGuideId', requireAuth({ role: "tourist" }), rateTourGuide);
router.post('/comment/:id', requireAuth({ role: "tourist" }), commentOnTourGuide);
router.get('/notifs', requireAuth({ role: "tourGuide" }), myNotifications);
router.get('/notif/:id', requireAuth({ role: "tourGuide" }), specificNotification);
router.patch('/notifs', requireAuth({ role: "tourGuide" }), seenNotifications);
router.get('/salesReport', requireAuth({ role: "tourGuide" }), viewSalesReport);
router.get('/filterReport/:itineraryId/:startDate/:endDate', requireAuth({ role: "tourGuide" }), viewFilterSalesReport);
router.get('/touristReport', requireAuth({ role: "tourGuide" }), viewTouristReport);
router.get('/tourGuideInfo/:id', getTourGuideInfo);
router.get('/tags', getAllTags)
router.get('/activities', readActivities);

module.exports = router;