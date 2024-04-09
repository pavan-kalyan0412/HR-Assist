const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/admin', adminController.admin);
router.post('/admin-reg', adminController.adminReg);
router.get('/admin-dashboard', adminController.isAuthenticated, adminController.adminDashboard);

module.exports = router;