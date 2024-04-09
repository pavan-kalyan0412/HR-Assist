const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer configuration to store the uploaded resumes in the 'uploads' directory
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const uploadFolder = path.join(__dirname, '..', 'uploads'); 
  
      // Create the folder if it doesn't exist
      fs.mkdir(uploadFolder, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating upload folder:', err);
        }
        cb(null, uploadFolder);
      });
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
  });
  
  
  // File type filter to accept only PDF files
  const fileFilter = (_req, file, cb) => {
      const allowedFileTypes = ['.pdf'];
      const fileExtension = path.extname(file.originalname).toLowerCase();
    
      if (allowedFileTypes.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed.'));
      }
    };
  
  
    const upload = multer({ storage: storage, fileFilter: fileFilter });



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
router.post('/upload', userController.checkAccountStatus, upload.single('resume'), userController.handleResumeUpload);
router.get('/logout', userController.UserLogout);
router.get('/deactivate', userController.checkAuthentication, userController.deactivate);
router.post('/deactivate-account', userController.handleDeactivate);
router.get('/reactivate-account',userController.checkAuthentication, userController.reactivate);
router.post('/reactivate-account', userController.handleReactivate);
router.get('/confirm-delete', userController.checkAuthentication, userController.checkAccountStatus, userController.confirmDelete);
router.post('/delete-account', userController.checkAuthentication, userController.checkAccountStatus, userController.handleDelete);

module.exports = router;
