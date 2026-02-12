const Report = require('../models/Report.model');
const aiService = require('../utils/aiService');
const rewardPoints = require('../utils/rewardPoints');
const googleMaps = require('../utils/googleMaps');

// @desc    Create new report with AI analysis
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    
    const images = req.files ? req.files.map(file => ({
      url: file.path
    })) : [];

    const locationData = JSON.parse(location);
    
    // Get address from coordinates
    const addressInfo = await googleMaps.getAddressFromCoordinates(
      locationData.coordinates[1],
      locationData.coordinates[0]
    );
    
    locationData.address = addressInfo.address;

    // Create report
    const report = await Report.create({
      title,
      description,
      category,
      location: locationData,
      images,
      reportedBy: req.user.id
    });

    // Run AI analysis if images provided
    if (images.length > 0) {
      try {
        const analysis = await aiService.analyzeImage(images[0].url);
        
        if (analysis.success) {
          // Update with AI results
          const aiData = analysis.analysis;
          
          report.aiVerification.verified = true;
          report.aiVerification.confidence = aiData.classification?.confidence || 0;
          
          if (aiData.detection) {
            report.aiVerification.wasteCount = aiData.detection.count || 0;
            report.aiVerification.severity = aiData.detection.severity || {};
            report.aiVerification.priority = aiData.detection.severity?.priority || 5;
          }
          
          await report.save();
          
          // Award points for submission
          await rewardPoints.awardSubmissionPoints(report._id);
        }
      } catch (aiError) {
        console.error('AI analysis failed:', aiError.message);
        // Continue without AI analysis
      }
    }

    res.status(201).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reports by current user
// @route   GET /api/reports/my-reports
// @access  Private
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: reports.length, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get report by ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email');
    
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get assigned reports for cleaner
// @route   GET /api/reports/assigned/me
// @access  Private (Cleaner, Admin)
exports.getAssignedReports = async (req, res) => {
  try {
    const reports = await Report.find({ assignedTo: req.user.id })
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: reports.length, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Start working on report
// @route   PUT /api/reports/:id/start
// @access  Private (Cleaner, Admin)
exports.startReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: 'in-progress' },
      { new: true }
    );
    
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Complete report with before/after verification
// @route   PUT /api/reports/:id/complete
// @access  Private (Cleaner, Admin)
exports.completeReport = async (req, res) => {
  try {
    const afterImage = req.file ? req.file.path : null;
    
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    
    report.afterImage = afterImage;
    report.status = 'completed';
    report.completedAt = Date.now();
    
    // Verify cleanup with Siamese Network
    if (report.images.length > 0 && afterImage) {
      try {
        const verification = await aiService.verifyCleanup(
          report.images[0].url,
          afterImage
        );
        
        if (verification.success) {
          const verifyData = verification.verification;
          
          report.cleanupVerification = {
            verified: verifyData.is_cleaned,
            cleanupQuality: verifyData.cleanup_quality,
            status: verifyData.status,
            rewardMultiplier: verifyData.reward_multiplier,
            verifiedAt: Date.now()
          };
          
          // Award completion points
          await report.save();
          await rewardPoints.awardCompletionPoints(report._id);
        }
      } catch (aiError) {
        console.error('Cleanup verification failed:', aiError.message);
      }
    }
    
    await report.save();
    
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign report to cleaner
// @route   PUT /api/reports/:id/assign
// @access  Private (Admin)
exports.assignReport = async (req, res) => {
  try {
    const { cleanerId } = req.body;
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { 
        assignedTo: cleanerId,
        status: 'assigned'
      },
      { new: true }
    );
    
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update report status
// @route   PUT /api/reports/:id/status
// @access  Private (Admin)
exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private (Admin)
exports.deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
