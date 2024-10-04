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

const router = express.Router()
router.get('/activity/id',readOneActivity);
router.get('/myActivities',myCreatedActivities);
router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity',createActivity);
router.get('/activities',readActivities);
router.put('/activity/:id',updateActivity);
router.delete('/activity/:id',deleteActivity);

module.exports = router
