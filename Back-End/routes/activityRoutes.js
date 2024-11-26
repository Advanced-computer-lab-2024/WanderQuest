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

router.get('/activity/:id', requireAuth({ role: 'advertiser' }), readOneActivity);
router.get('/myActivities', requireAuth({ role: 'advertiser' }), myCreatedActivities);
router.get('/allAdvertisers', requireAuth({ role: 'admin' }), getAllAdvertisers);
router.post('/activity', requireAuth({ role: 'advertiser' }), createActivity);
router.get('/activities', requireAuth({ role: 'advertiser' }), readActivities);
router.put('/activity/:id', requireAuth({ role: 'advertiser' }), updateActivity);
router.delete('/activity/:id', requireAuth({ role: 'advertiser' }), deleteActivity);
router.get('/upcomingActivities', requireAuth({ role: 'tourist' }), getUpcomingActivities);
router.get('/upcomingItineraries', requireAuth({ role: 'tourist' }), getUpcomingItineraries);
router.post('/activity/rate/:id', requireAuth({ role: 'tourist' }), rateAnActivity);
router.post('/comment/:id', requireAuth({ role: 'tourist' }), commentOnActivity),
    module.exports = router
