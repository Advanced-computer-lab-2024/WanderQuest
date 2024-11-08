const express = require('express');

// controller functions
const { registerUser, uploadDocuments, getUserDocuments, getDocumentByFileID, changePassword, acceptUser, acceptTerms } = require('../controllers/authenticationController');

const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/changePassword/:id', changePassword);
router.post('/uploadDocuments/:id', uploadDocuments);
router.get('/getDocuments/:id', getUserDocuments);
router.get('/getDocumentByFilename/:id', getDocumentByFileID);
router.patch('/acceptUser/:id', acceptUser);
router.patch('/acceptTerms/:id', acceptTerms);

module.exports = router;