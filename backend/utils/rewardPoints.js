const Report = require('../models/Report.model');
const User = require('../models/User.model');
const axios = require('axios');

/**
 * Reward Points Calculator
 * Calculates reward points based on report completion and quality
 */
class RewardPointsService {
  constructor() {
    // Base points configuration
    this.basePoints = {
      reportSubmission: 10,
      reportVerified: 5,
      taskCompleted: 20,
      qualityBonus: {
        excellent: 15,
        good: 10,
        partial: 5,
        insufficient: 0
      }
    };
    
    // Severity multipliers
    this.severityMultipliers = {
      critical: 2.0,
      high: 1.5,
      medium: 1.2,
      low: 1.0,
      minimal: 1.0,
      none: 1.0
    };
    
    // Category multipliers
    this.categoryMultipliers = {
      hazardous: 2.0,
      electronic: 1.5,
      plastic: 1.0,
      organic: 0.8,
      other: 1.0
    };
  }
  
  /**
   * Calculate points for report submission
   */
  calculateSubmissionPoints(report) {
    let points = this.basePoints.reportSubmission;
    
    // Add bonus for AI verification
    if (report.aiVerification?.verified) {
      points += this.basePoints.reportVerified;
    }
    
    // Apply severity multiplier
    const severity = report.aiVerification?.severity?.level || 'none';
    const severityMultiplier = this.severityMultipliers[severity] || 1.0;
    points *= severityMultiplier;
    
    // Apply category multiplier
    const categoryMultiplier = this.categoryMultipliers[report.category] || 1.0;
    points *= categoryMultiplier;
    
    return Math.round(points);
  }
  
  /**
   * Calculate points for cleanup completion
   */
  calculateCompletionPoints(report) {
    let points = this.basePoints.taskCompleted;
    
    // Add quality bonus
    const qualityStatus = report.cleanupVerification?.status || 'insufficient';
    const qualityBonus = this.basePoints.qualityBonus[qualityStatus] || 0;
    points += qualityBonus;
    
    // Apply cleanup quality multiplier
    const rewardMultiplier = report.cleanupVerification?.rewardMultiplier || 1.0;
    points *= rewardMultiplier;
    
    // Apply severity multiplier (harder cleanups get more points)
    const severity = report.aiVerification?.severity?.level || 'none';
    const severityMultiplier = this.severityMultipliers[severity] || 1.0;
    points *= severityMultiplier;
    
    return Math.round(points);
  }
  
  /**
   * Award points to user
   */
  async awardPoints(userId, points, reason) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      user.rewardPoints += points;
      await user.save();
      
      // TODO: Create transaction log
      console.log(`Awarded ${points} points to user ${userId} for ${reason}`);
      
      return {
        success: true,
        pointsAwarded: points,
        totalPoints: user.rewardPoints
      };
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }
  
  /**
   * Award points for report submission
   */
  async awardSubmissionPoints(reportId) {
    try {
      const report = await Report.findById(reportId).populate('reportedBy');
      if (!report) {
        throw new Error('Report not found');
      }
      
      // Calculate points
      const points = this.calculateSubmissionPoints(report);
      
      // Award to user
      await this.awardPoints(
        report.reportedBy._id,
        points,
        'Report submission'
      );
      
      // Update report
      report.rewardPoints.basePoints = points;
      report.rewardPoints.totalPoints = points;
      await report.save();
      
      return { success: true, points };
    } catch (error) {
      console.error('Error awarding submission points:', error);
      throw error;
    }
  }
  
  /**
   * Award points for cleanup completion
   */
  async awardCompletionPoints(reportId) {
    try {
      const report = await Report.findById(reportId).populate('assignedTo');
      if (!report) {
        throw new Error('Report not found');
      }
      
      // Calculate points
      const points = this.calculateCompletionPoints(report);
      
      // Award to cleaner
      await this.awardPoints(
        report.assignedTo._id,
        points,
        'Cleanup completion'
      );
      
      // Update report
      report.rewardPoints.bonusPoints = points;
      report.rewardPoints.totalPoints += points;
      report.rewardPoints.awarded = true;
      await report.save();
      
      return { success: true, points };
    } catch (error) {
      console.error('Error awarding completion points:', error);
      throw error;
    }
  }
  
  /**
   * Get user leaderboard
   */
  async getLeaderboard(limit = 10) {
    try {
      const topUsers = await User.find({ isActive: true })
        .sort({ rewardPoints: -1 })
        .limit(limit)
        .select('name email rewardPoints role');
      
      return topUsers;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  }
}

module.exports = new RewardPointsService();
