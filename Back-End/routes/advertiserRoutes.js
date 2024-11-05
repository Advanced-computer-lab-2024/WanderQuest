const express = require('express');

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
    readOneActivityByName }
    = require('../controllers/advertiserController');
const router = express.Router();

// // require auth for all advertiser routes
// router.use(requireAuth({ role: 'advertiser' }));

// get and update profile will use query param for now untill we have a proper auth
// routes
router.get('/activity/:id', readOneActivity);
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.post('/uploadLogo/:id', uploadLogo);
router.get('/logo/:id', getLogo);
router.get('/advertiserId', getAdvertiserId);
router.get('/allAdvertisers', getAllAdvertisers);
router.post('/activity', createActivity);
router.get('/activities', readActivities);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);
router.get('/myActivities/:id', myCreatedActivities);

module.exports = router;