const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// Protected routes
router.use(protect);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/rewards', userController.getRewards);
router.get('/notifications', userController.getNotifications);

module.exports = router;
