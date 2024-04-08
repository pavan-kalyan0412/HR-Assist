const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.get('/index', userController.index);
router.get('/register', userController.register);
router.post('/handle-login', userController.handleLogin);
router.post('/handle-registration', userController.handleRegistration);
router.get('/forgot-password', userController.forgotPassword);
router.post('/handle-forgot-password', userController.handleForgotPassword);
router.get('/reset-password', userController.resetPassword);
router.post('/handle-reset-password', userController.handleResetPassword);
router.get('/profile', userController.handleProfileView);
router.get('/view-resume/:fileName', userController.viewResume);
router.get('/update-profile', userController.updateProfile);
router.post('/update-profile-details', userController.updateProfileDetails);
router.get('/resume-upload', userController.resumeUpload);
router.post('/handle-resume-upload', userController.handleResumeUpload);
router.get('/logout', userController.UserLogout);
router.get('/deactivate', userController.deactivate);
router.post('/handle-deactivate', userController.handleDeactivate);
router.get('/reactivate-account', userController.reactivate);
router.post('/handle-reactivate-account', userController.handleReactivate);
router.get('/confirm-delete', userController.confirmDelete);
router.post('/handle-delete-account', userController.handleDelete);

module.exports = router;
