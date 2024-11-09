const express = require('express');

// controller functions
const { registerUser, uploadDocuments, getUserDocuments, getUsersRequestingAcceptance, getDocumentByFileID, changePassword, acceptUser, acceptTerms, requestAccountDeletion } = require('../controllers/authenticationController');

const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/changePassword/:id', changePassword);
router.post('/uploadDocuments/:id', uploadDocuments);
router.get('/getDocuments/:id', getUserDocuments);
router.get('/getUsersRequestingAcceptance', getUsersRequestingAcceptance);
router.get('/getDocumentByFileID/:id', getDocumentByFileID);
router.patch('/acceptUser/:id', acceptUser);
router.patch('/acceptTerms/:id', acceptTerms);
router.patch('/requestAccountDeletion/:id', requestAccountDeletion);

module.exports = router;