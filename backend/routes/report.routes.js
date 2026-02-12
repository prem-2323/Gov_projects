const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Protected routes - All roles
router.use(protect);

// Citizen routes
router.post('/', upload.array('images', 5), reportController.createReport);
router.get('/my-reports', reportController.getMyReports);
router.get('/:id', reportController.getReportById);

// Cleaner routes
router.get('/assigned/me', authorize('cleaner', 'admin'), reportController.getAssignedReports);
router.put('/:id/start', authorize('cleaner', 'admin'), reportController.startReport);
router.put('/:id/complete', authorize('cleaner', 'admin'), upload.single('afterImage'), reportController.completeReport);

// Admin routes
router.put('/:id/assign', authorize('admin'), reportController.assignReport);
router.put('/:id/status', authorize('admin'), reportController.updateReportStatus);
router.delete('/:id', authorize('admin'), reportController.deleteReport);

module.exports = router;
