const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Admin only routes
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', adminController.getDashboard);
router.get('/analytics', adminController.getAnalytics);
router.get('/users', adminController.getAllUsers);
router.get('/cleaners', adminController.getAllCleaners);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);
router.get('/reports/all', adminController.getAllReports);

module.exports = router;
