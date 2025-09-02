const express = require('express');
const Asset = require('../models/Asset');
const Liability = require('../models/Liability');
const Income = require('../models/Income');
const Profile = require('../models/Profile');
const { auth, enterpriseAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/finance/financial
// @desc    Get comprehensive financial calculation data
// @access  Private (Enterprise)
router.get('/financial/', auth, enterpriseAuth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const assets = await Asset.find({ user: req.user.id });
    const liabilities = await Liability.find({ user: req.user.id });
    const incomes = await Income.find({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    const currentYear = new Date().getFullYear();
    const financialData = [];

    // Calculate totals
    const total401k = assets
      .filter(asset => asset.type === '401k')
      .reduce((sum, asset) => sum + asset.currentBalance, 0);
    
    const totalRoth = assets
      .filter(asset => asset.type === 'ROTH')
      .reduce((sum, asset) => sum + asset.currentBalance, 0);

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const incomeGoal = incomes.length > 0 ? incomes[0].incomeGoal : 100000;

    // Generate 20-year projection
    for (let i = 0; i < 20; i++) {
      const year = currentYear + i;
      const clientAge = (profile.clientAge || 65) + i;
      const spouseAge = (profile.spouseAge || 65) + i;
      const retirementAge = profile.clientRetirementAge || 65;
      const spouseRetirementAge = profile.spouseRetirementAge || 65;

      // Simple growth calculations
      const growthRate = 0.07; // 7% annual growth
      const inflationRate = 0.03; // 3% inflation

      const projected401k = total401k * Math.pow(1 + growthRate, i);
      const projectedRoth = totalRoth * Math.pow(1 + growthRate, i);
      const adjustedIncomeGoal = incomeGoal * Math.pow(1 + inflationRate, i);
      const adjustedTotalIncome = totalIncome * Math.pow(1 + inflationRate, i);

      financialData.push({
        year: year,
        client_age: clientAge,
        retirement_age: retirementAge,
        spouse_age: spouseAge,
        spouse_retirement_age: spouseRetirementAge,
        total_income: adjustedTotalIncome,
        income_goal: adjustedIncomeGoal,
        income_gap: Math.max(0, adjustedIncomeGoal - adjustedTotalIncome),
        client_soc_income: clientAge >= 62 ? 25000 * Math.pow(1 + inflationRate, i) : 0,
        client_pension_income: clientAge >= retirementAge ? 30000 * Math.pow(1 + inflationRate, i) : 0,
        client_salary_income: clientAge < retirementAge ? 60000 * Math.pow(1 + inflationRate, i) : 0,
        client_other_income: 5000 * Math.pow(1 + inflationRate, i),
        client_401k_balance: projected401k,
        client_roth_balance: projectedRoth,
        spouse_soc_income: spouseAge >= 62 ? 20000 * Math.pow(1 + inflationRate, i) : 0,
        spouse_pension_income: spouseAge >= spouseRetirementAge ? 25000 * Math.pow(1 + inflationRate, i) : 0,
        spouse_salary_income: spouseAge < spouseRetirementAge ? 50000 * Math.pow(1 + inflationRate, i) : 0,
        spouse_other_income: 3000 * Math.pow(1 + inflationRate, i),
        spouse_401k_balance: projected401k * 0.6, // Assume spouse has 60% of client's 401k
        spouse_roth_balance: projectedRoth * 0.6
      });
    }

    res.json(financialData);
  } catch (error) {
    console.error('Get financial data error:', error);
    res.status(500).json({
      message: 'Server error while calculating financial data'
    });
  }
});

module.exports = router;