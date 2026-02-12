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
    }]
  },
  beforeImage: {
    type: String,
    default: null
  },
  afterImage: {
    type: String,
    default: null
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
