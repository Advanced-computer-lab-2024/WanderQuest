const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const { registerUser, uploadDocuments, getUserDocuments, getUsersRequestingAcceptance, getDocumentByFileID, changePassword, acceptUser, acceptTerms, requestAccountDeletion } = require('../controllers/authenticationController');

const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/changePassword', requireAuth(), changePassword);
router.post('/uploadDocuments', requireAuth(), uploadDocuments);
router.get('/getDocuments', requireAuth(), getUserDocuments);
router.get('/getUsersRequestingAcceptance', requireAuth({ role: 'admin' }), getUsersRequestingAcceptance);
router.get('/getDocumentByFileID/:id', requireAuth(), getDocumentByFileID);
router.patch('/acceptUser/:id', requireAuth({ role: 'admin' }), acceptUser);
router.patch('/acceptTerms', requireAuth(), acceptTerms);
router.patch('/requestAccountDeletion', requireAuth(), requestAccountDeletion);

module.exports = router;