const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  category: {
    type: String,
    enum: ['plastic', 'organic', 'electronic', 'hazardous', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in-progress', 'completed', 'rejected'],
    default: 'pending'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  images: [{
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  aiVerification: {
    verified: {
      type: Boolean,
      default: false
    },
    confidence: {
      type: Number,
      default: 0
    },
    detectedItems: [{
      item: String,
      confidence: Number
    }],
    wasteCount: {
      type: Number,
      default: 0
    },
    severity: {
      level: {
        type: String,
        enum: ['none', 'minimal', 'low', 'medium', 'high', 'critical'],
        default: 'none'
      },
      score: {
        type: Number,
        default: 0
      },
      dominantType: String,
      wasteDistribution: {
        type: Map,
        of: Number
      }
    },
    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 5  // 1 = highest priority, 5 = lowest
    }
  },
  beforeImage: {
    type: String,
    default: null
  },
  afterImage: {
    type: String,
    default: null
  },
  cleanupVerification: {
    verified: {
      type: Boolean,
      default: false
    },
    cleanupQuality: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['none', 'insufficient', 'partial', 'good', 'excellent'],
      default: 'none'
    },
    rewardMultiplier: {
      type: Number,
      default: 1.0
    },
    verifiedAt: {
      type: Date,
      default: null
    }
  },
  rewardPoints: {
    basePoints: {
      type: Number,
      default: 10
    },
    bonusPoints: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    awarded: {
      type: Boolean,
      default: false
    }
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for geospatial queries
reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
