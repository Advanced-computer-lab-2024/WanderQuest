const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const {
    getAllAdvertisers,
    createActivity,
    readActivities,
    updateActivity,
    deleteActivity,
    readOneActivity,
    myCreatedActivities }
    = require('../controllers/advertiserController');
const { getUpcomingActivities, getUpcomingItineraries, rateAnActivity, commentOnActivity } = require('../controllers/touristController');
const router = express.Router()

router.get('/activity/:id', readOneActivity);
router.get('/myActivities', requireAuth({ role: 'advertiser' }), myCreatedActivities);
router.get('/allAdvertisers', requireAuth({ role: 'Admin' }), getAllAdvertisers);
router.post('/activity', requireAuth({ role: 'advertiser' }), createActivity);
router.get('/activities', readActivities);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);
router.get('/upcomingActivities', getUpcomingActivities);
router.get('/upcomingItineraries', getUpcomingItineraries);
router.post('/activity/rate/:id', requireAuth({ role: 'tourist' }), rateAnActivity);
router.post('/comment/:id', requireAuth({ role: 'tourist' }), commentOnActivity),
    module.exports = router
