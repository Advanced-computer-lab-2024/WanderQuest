const express = require('express');
const requireAuth = require('../middleware/requireAuth');

// controller functions
const {
    getUser,
    registerUser,
    login,
    uploadDocuments,
    getUserDocuments,
    getUsersRequestingAcceptance,
    getDocumentByFileID,
    changePassword,
    acceptUser,
    acceptTerms,
    requestAccountDeletion,
    requestForgetPasswordEmail,
    resetPassword,
    logout
} = require('../controllers/authenticationController');

const router = express.Router();

// routes
router.post('/register', registerUser);
router.post('/login', login);
router.get('/user', requireAuth(), getUser);
router.post('/changePassword', requireAuth(), changePassword);
router.post('/uploadDocuments', requireAuth(), uploadDocuments);
router.get('/getDocuments/:id', requireAuth(), getUserDocuments);
router.get('/getUsersRequestingAcceptance', requireAuth({ role: 'Admin' }), getUsersRequestingAcceptance);
router.get('/getDocumentByFileID/:id', requireAuth(), getDocumentByFileID);
router.patch('/acceptUser/:id', requireAuth({ role: 'Admin' }), acceptUser);
router.patch('/acceptTerms', requireAuth(), acceptTerms);
router.patch('/requestAccountDeletion', requireAuth(), requestAccountDeletion);
router.post('/requestForgetPasswordEmail', requestForgetPasswordEmail);
router.post('/resetPassword', resetPassword);
router.post('/logout', logout);

module.exports = router;