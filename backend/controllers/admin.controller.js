const User = require('../models/User.model');
const Report = require('../models/Report.model');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'pending' });
    const completedReports = await Report.countDocuments({ status: 'completed' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalReports,
        pendingReports,
        completedReports
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res) => {
  try {
    // TODO: Implement analytics aggregation
    res.status(200).json({ success: true, analytics: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all cleaners
// @route   GET /api/admin/cleaners
// @access  Private (Admin)
exports.getAllCleaners = async (req, res) => {
  try {
    const cleaners = await User.find({ role: 'cleaner' }).select('-password');
    res.status(200).json({ success: true, count: cleaners.length, cleaners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reports
// @route   GET /api/admin/reports/all
// @access  Private (Admin)
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: reports.length, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
