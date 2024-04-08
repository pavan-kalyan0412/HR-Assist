const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example routes using controller functions
router.get('/index', userController.index);
router.post('/register', userController.register);
router.get('/home', userController.checkAuthentication, userController.home);
router.get('/homepage', userController.checkAuthentication, userController.homepage);
router.post('/home', userController.handleLogin);
router.post('/addname', userController.handleRegistration);
router.get('/forgot-password', userController.checkAuthentication, userController.forgotPassword);
router.post('/forgot-password', userController.handleForgotPassword);
router.get('/reset-password', userController.resetPassword);
router.post('/reset-password', userController.handleResetPassword);
router.get('/profile', userController.checkAuthentication, userController.checkAccountStatus, userController.handleProfileView);
router.get('/view-resume/:fileName', userController.checkAuthentication, userController.viewResume);
router.get('/update-profile', userController.checkAuthentication, userController.checkAccountStatus, userController.updateProfile);
router.post('/update-profile', userController.checkAccountStatus, userController.updateProfileDetails);
router.get('/resume-upload', userController.checkAuthentication, userController.checkAccountStatus, userController.resumeUpload);
// router.post('/upload', userController.checkAuthentication, userController.checkAccountStatus, userController.upload.single('resume'), userController.handleResumeUpload);
router.get('/logout', userController.UserLogout);
router.get('/deactivate', userController.checkAuthentication, userController.deactivate);
router.post('/deactivate-account', userController.checkAuthentication, userController.handleDeactivate);
router.get('/reactivate-account', userController.reactivate);
router.post('/reactivate-account', userController.handleReactivate);
router.get('/confirm-delete', userController.checkAuthentication, userController.checkAccountStatus, userController.confirmDelete);
router.post('/delete-account', userController.checkAuthentication, userController.checkAccountStatus, userController.handleDelete);

module.exports = router;
