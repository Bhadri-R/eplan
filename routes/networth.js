const express = require('express');
const Asset = require('../models/Asset');
const Liability = require('../models/Liability');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/networth/networth
// @desc    Calculate and get user net worth
// @access  Private
router.get('/networth/', auth, async (req, res) => {
  try {
    // Get user's assets
    const assets = await Asset.find({ user: req.user.id });
    const totalAssets = assets.reduce((sum, asset) => sum + asset.currentBalance, 0);

    // Get user's liabilities
    const liabilities = await Liability.find({ user: req.user.id });
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.currentBalance, 0);

    // Calculate net worth
    const netWorth = totalAssets - totalLiabilities;

    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    res.json({
      networth: {
        total_assets: formatCurrency(totalAssets),
        total_liabilities: formatCurrency(totalLiabilities),
        net_worth: formatCurrency(netWorth)
      },
      raw_values: {
        total_assets: totalAssets,
        total_liabilities: totalLiabilities,
        net_worth: netWorth
      }
    });
  } catch (error) {
    console.error('Get networth error:', error);
    res.status(500).json({
      message: 'Server error while calculating net worth'
    });
  }
});

module.exports = router;