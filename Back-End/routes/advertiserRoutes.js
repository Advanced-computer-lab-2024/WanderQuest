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
    myNotifications,viewSalesReport }
    = require('../controllers/advertiserController');
const { createTransportation, getAllTransportations } = require('../controllers/transportationController');

const router = express.Router();

// get and update profile will use query param for now untill we have a proper auth
// routes
router.get('/activity/:id', readOneActivity);
router.get('/profile', requireAuth({ role: 'advertiser' }), getProfile);
router.put('/profile', requireAuth({ role: 'advertiser' }), updateProfile);
router.post('/uploadLogo', requireAuth({ role: 'advertiser' }), uploadLogo);
router.get('/logo', requireAuth({ role: 'advertiser' }), getLogo);
router.get('/allAdvertisers', requireAuth({ role: 'Admin' }), getAllAdvertisers);
router.post('/activity', requireAuth({ role: 'advertiser' }), createActivity);
router.get('/activities', readActivities);
router.put('/activity/:id', requireAuth({ role: 'advertiser' }), updateActivity);
router.delete('/activity/:id', requireAuth({ role: 'advertiser' }), deleteActivity);
router.get('/myActivities', requireAuth({ role: 'advertiser' }), myCreatedActivities);
router.post('/transportation/create', requireAuth({ role: 'advertiser' }), createTransportation);
router.get('/transportations', getAllTransportations);
router.get('/notifs/:id',requireAuth({role: "advertiser"}),myNotifications);
router.get('/salesReport/:id',viewSalesReport);

module.exports = router;