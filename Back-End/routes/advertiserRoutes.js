const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { getProfile, updateProfile, uploadLogo, getLogo, getAdvertiserId } = require('../controllers/advertiserController');
// const requireAuth = require('../middleware/requireAuth');
const {
    getAllAdvertisers,
    createActivity,
    readActivities,
    updateActivity,
    deleteActivity,
    myCreatedActivities,
    readOneActivity,
    readOneActivityByName,
    myNotifications,
    seenNotifications,
    viewSalesReport,
    viewTouristsReport }
    = require('../controllers/advertiserController');
const { getCategories, getAllTags } = require('../controllers/adminController');
const { createTransportation, getAllTransportations } = require('../controllers/transportationController');

const router = express.Router();

// get and update profile will use query param for now untill we have a proper auth
// routes
router.get('/activity/:id', readOneActivity);

//d
router.get('/profile', requireAuth({ role: 'advertiser' }), getProfile);
//d
router.put('/profile', requireAuth({ role: 'advertiser' }), updateProfile);
//d
router.post('/uploadLogo', requireAuth({ role: 'advertiser' }), uploadLogo);

router.get('/logo', requireAuth({ role: 'advertiser' }), getLogo);
//d
router.get('/allAdvertisers', requireAuth({ role: 'Admin' }), getAllAdvertisers);
//d
router.post('/activity', requireAuth({ role: 'advertiser' }), createActivity);
//d
router.get('/activities', readActivities);
//d
router.put('/activity/:id', requireAuth({ role: 'advertiser' }), updateActivity);
//d
router.delete('/activity/:id', requireAuth({ role: 'advertiser' }), deleteActivity);
//d
router.get('/myActivities', requireAuth({ role: 'advertiser' }), myCreatedActivities);
//d
router.post('/transportation/create', requireAuth({ role: 'advertiser' }), createTransportation);
//d
router.get('/transportations', getAllTransportations);
//d
router.get('/notifs', requireAuth({ role: "advertiser" }), myNotifications);
//d
router.patch('/notifs', requireAuth({ role: "advertiser" }), seenNotifications);
//d
router.get('/salesReport', requireAuth({ role: "advertiser" }), viewSalesReport);
//d
router.get('/TouristReport', requireAuth({ role: "advertiser" }), viewTouristsReport);
//d
router.get('/categories', getCategories)
//d
router.get('/tags', getAllTags)

module.exports = router;