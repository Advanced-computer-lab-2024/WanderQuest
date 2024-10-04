const express = require('express');

const { 
    getAllAdvertisers,
     createActivity,
     readActivities,
     updateActivity,
     deleteActivity,
     readOneActivity } 
= require('../controllers/advertiserController');

const router = express.Router()

router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity',createActivity);
router.get('/activities',readActivities);
router.put('/activity/:id',updateActivity);
router.delete('/activity/:id',deleteActivity);
router.get('/activity/:id',readOneActivity)
module.exports = router
