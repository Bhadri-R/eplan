const express = require('express');
const Asset = require('../models/Asset');
const Income = require('../models/Income');
const Profile = require('../models/Profile');
const { auth, enterpriseAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/graph/asset-allocation
// @desc    Get current asset allocation for charts
// @access  Private
router.get('/asset-allocation/', auth, async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user.id });
    
    if (assets.length === 0) {
      return res.json({
        current_asset_allocation: {
          'Protected': 0,
          'Bank': 0,
          'Wall Street': 0
        }
      });
    }

    const totalBalance = assets.reduce((sum, asset) => sum + asset.currentBalance, 0);
    
    const allocation = {
      'Protected': 0,
      'Bank': 0,
      'Wall Street': 0
    };

    assets.forEach(asset => {
      const percentage = (asset.currentBalance / totalBalance) * 100;
      allocation[asset.risk] += percentage;
    });

    // Round to 2 decimal places
    Object.keys(allocation).forEach(key => {
      allocation[key] = Math.round(allocation[key] * 100) / 100;
    });

    res.json({
      current_asset_allocation: allocation
    });
  } catch (error) {
    console.error('Get asset allocation error:', error);
    res.status(500).json({
      message: 'Server error while calculating asset allocation'
    });
  }
});

// @route   GET /api/graph/rule_of_100_allocation
// @desc    Get rule of 100 asset allocation
// @access  Private
router.get('/rule_of_100_allocation/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile || !profile.clientAge) {
      return res.json({
        rule_of_100_allocation: {
          'Protected': 50,
          'Bank': 10,
          'Wall Street': 40
        }
      });
    }

    const age = profile.clientAge;
    const protectedPercentage = age;
    const wallStreetPercentage = 100 - age;
    const bankPercentage = 10; // Fixed 10% for bank

    // Adjust if percentages don't add up to 100
    const adjustedProtected = Math.max(0, protectedPercentage - 5);
    const adjustedWallStreet = Math.max(0, 100 - adjustedProtected - bankPercentage);

    res.json({
      rule_of_100_allocation: {
        'Protected': adjustedProtected,
        'Bank': bankPercentage,
        'Wall Street': adjustedWallStreet
      }
    });
  } catch (error) {
    console.error('Get rule of 100 allocation error:', error);
    res.status(500).json({
      message: 'Server error while calculating rule of 100 allocation'
    });
  }
});

// @route   GET /api/graph/chart
// @desc    Get ePlan recommended allocation
// @access  Private (Enterprise)
router.get('/chart/', auth, enterpriseAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    // ePlan recommended allocation
    const eplanAllocation = {
      'My-ePlan Pension': 45,
      'Protected': 17,
      'Bank': 4,
      'Wall Street': 35
    };

    res.json({
      message: 'ePlan allocation data retrieved successfully',
      current_asset_allocation: eplanAllocation
    });
  } catch (error) {
    console.error('Get ePlan chart error:', error);
    res.status(500).json({
      message: 'Server error while fetching ePlan chart data'
    });
  }
});

// @route   GET /api/graph/financial-projection
// @desc    Get financial projection data for charts
// @access  Private (Enterprise)
router.get('/financial-projection/', auth, enterpriseAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const incomes = await Income.find({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    const currentYear = new Date().getFullYear();
    const projectionData = [];
    
    // Get income goal
    const incomeGoal = incomes.length > 0 ? incomes[0].incomeGoal : 100000;
    const totalCurrentIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    // Generate projection for next 20 years
    for (let i = 0; i < 20; i++) {
      const year = currentYear + i;
      const clientAge = (profile.clientAge || 65) + i;
      
      // Simple projection logic
      const inflationRate = 0.03;
      const adjustedIncomeGoal = incomeGoal * Math.pow(1 + inflationRate, i);
      const adjustedTotalIncome = totalCurrentIncome * Math.pow(1 + inflationRate, i);
      const incomeGap = Math.max(0, adjustedIncomeGoal - adjustedTotalIncome);

      projectionData.push({
        year: year,
        income_goal: Math.round(adjustedIncomeGoal),
        total_income: Math.round(adjustedTotalIncome),
        income_gap: Math.round(incomeGap)
      });
    }

    res.json(projectionData);
  } catch (error) {
    console.error('Get financial projection error:', error);
    res.status(500).json({
      message: 'Server error while calculating financial projection'
    });
  }
});

module.exports = router;