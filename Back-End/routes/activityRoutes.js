const express = require('express');

const { 
    getAllAdvertisers,
     createActivity,
     readActivities,
     updateActivity,
     deleteActivity } 
= require('../controllers/advertiserController');

const router = express.Router()

router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity',createActivity);
router.get('/activities',readActivities);
router.put('/activity/:id',updateActivity);
router.delete('/activity/:id',deleteActivity);

module.exports = router
