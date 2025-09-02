const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
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
    enum: ['Salary', 'Pension', 'ePlan Pension', 'Social Security', 'Other']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  incomeGoal: {
    type: Number,
    required: [true, 'Income goal is required'],
    min: [0, 'Income goal cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Income', incomeSchema);