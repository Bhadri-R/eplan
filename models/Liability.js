const mongoose = require('mongoose');

const liabilitySchema = new mongoose.Schema({
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
    enum: ['Loan', 'Mortgage', 'Credit Card Dept', 'Other']
  },
  account: {
    type: String,
    required: [true, 'Account name is required'],
    trim: true
  },
  monthlyPayment: {
    type: Number,
    required: [true, 'Monthly payment is required'],
    min: [0, 'Monthly payment cannot be negative']
  },
  currentBalance: {
    type: Number,
    required: [true, 'Current balance is required'],
    min: [0, 'Current balance cannot be negative']
  },
  interestRate: {
    type: Number,
    required: [true, 'Interest rate is required'],
    min: [0, 'Interest rate cannot be negative'],
    max: [100, 'Interest rate cannot exceed 100%']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Liability', liabilitySchema);