const express = require('express');

// controller functions
const { getProfile, updateProfile } = require('../controllers/advertiserController');
const requireAuth = require('../middleware/requireAuth');
const { 
    getAllAdvertisers,
     createActivity,
     readActivities,
     updateActivity,
     deleteActivity } 
= require('../controllers/advertiserController');
const router = express.Router();

// require auth for all advertiser routes
router.use(requireAuth);

// routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity',createActivity);
router.get('/activities',readActivities);
router.put('/activity/:id',updateActivity);
router.delete('/activity/:id',deleteActivity);

module.exports = router;