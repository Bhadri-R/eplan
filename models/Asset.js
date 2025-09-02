const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['401k', '403b', 'Stocks', 'ePlan Pension', 'Checking Account', 'Savings Account', 'ROTH', 'Bonds', 'Other']
  },
  account: {
    type: String,
    required: [true, 'Account name is required'],
    trim: true
  },
  risk: {
    type: String,
    required: [true, 'Risk is required'],
    enum: ['Wall Street', 'Protected', 'Bank']
  },
  currentBalance: {
    type: Number,
    required: [true, 'Current balance is required'],
    min: [0, 'Current balance cannot be negative']
  },
  contribution: {
    type: Number,
    required: [true, 'Contribution is required'],
    min: [0, 'Contribution cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema);