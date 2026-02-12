const User = require('../models/User.model');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user rewards
// @route   GET /api/users/rewards
// @access  Private
exports.getRewards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('rewardPoints');
    res.status(200).json({ success: true, rewardPoints: user.rewardPoints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user notifications
// @route   GET /api/users/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    // TODO: Implement notifications system
    res.status(200).json({ success: true, notifications: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
