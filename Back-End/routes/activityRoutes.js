const express = require('express');

const {
    getAllAdvertisers,
    createActivity,
    readActivities,
    updateActivity,
    deleteActivity,
    readOneActivity,
    myCreatedActivities }
    = require('../controllers/advertiserController');
const { getUpcomingActivities, getUpcomingItineraries,rateAnActivity } = require('../controllers/touristController');
const router = express.Router()

router.get('/activity/:id', readOneActivity);
router.get('/myActivities/:id', myCreatedActivities);
router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity', createActivity);
router.get('/activities', readActivities);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);
router.get('/upcomingActivities', getUpcomingActivities);
router.get('/upcomingItineraries', getUpcomingItineraries);
router.post('/activity/rate/:id',rateAnActivity);

module.exports = router
