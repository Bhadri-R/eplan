const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 25
  }
});

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  clientAge: {
    type: Number,
    min: 18,
    max: 120
  },
  clientRetirementAge: {
    type: Number,
    min: 40,
    max: 80
  },
  clientMobile: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  clientEmail: {
    type: String,
    required: [true, 'Client email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  spouseName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  spouseAge: {
    type: Number,
    min: 18,
    max: 120
  },
  spouseRetirementAge: {
    type: Number,
    min: 40,
    max: 80
  },
  spouseMobile: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  spouseEmail: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  children: [childSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);