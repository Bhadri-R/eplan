const mongoose = require('mongoose');

const defaultParameterSchema = new mongoose.Schema({
  // 401k Parameters
  _401k_balance: {
    type: Number,
    default: 0
  },
  _401k_contributions: {
    type: Number,
    default: 0
  },
  _401k_opt_in_age: {
    type: Number,
    default: 65
  },
  _401k_rate_of_return: {
    type: Number,
    default: 7.0
  },
  _401k_withdrawal_rate: {
    type: Number,
    default: 4.0
  },
  _401k_inflation: {
    type: Number,
    default: 3.0
  },
  _401k_cola: {
    type: Number,
    default: 2.5
  },
  _401k_tax_rate: {
    type: Number,
    default: 22.0
  },
  _401k_rmd_rate: {
    type: Number,
    default: 4.0
  },
  _401k_rmd_age: {
    type: Number,
    default: 73
  },
  _401k_flat_rate: {
    type: Number,
    default: 0
  },
  _401k_flat_rate_age: {
    type: Number,
    default: 65
  },
  _401k_bonus: {
    type: Number,
    default: 0
  },
  _401k_lump_sum: {
    type: Number,
    default: 0
  },
  _401k_lump_sum_age: {
    type: Number,
    default: 65
  },
  
  // Roth Parameters
  roth_balance: {
    type: Number,
    default: 0
  },
  roth_contributions: {
    type: Number,
    default: 0
  },
  roth_opt_in_age: {
    type: Number,
    default: 65
  },
  roth_rate_of_return: {
    type: Number,
    default: 7.0
  },
  roth_withdrawal_rate: {
    type: Number,
    default: 4.0
  },
  roth_inflation: {
    type: Number,
    default: 3.0
  },
  roth_cola: {
    type: Number,
    default: 2.5
  },
  roth_tax_rate: {
    type: Number,
    default: 0
  },
  roth_rmd_rate: {
    type: Number,
    default: 0
  },
  roth_rmd_age: {
    type: Number,
    default: 73
  },
  roth_flat_rate: {
    type: Number,
    default: 0
  },
  roth_flat_rate_age: {
    type: Number,
    default: 65
  },
  roth_bonus: {
    type: Number,
    default: 0
  },
  roth_lump_sum: {
    type: Number,
    default: 0
  },
  roth_lump_sum_age: {
    type: Number,
    default: 65
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DefaultParameter', defaultParameterSchema);