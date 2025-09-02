const express = require('express');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/userchart
// @desc    Get user statistics for charts
// @access  Private (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    // Get user counts by role
    const totalUsers = await User.countDocuments();
    const enterpriseUsers = await User.countDocuments({ user_role: 'Enterprise' });
    const freeUsers = await User.countDocuments({ user_role: 'Normal' });

    // Generate monthly data for the last 12 months
    const chartData = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
      
      const monthlyTotal = await User.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      });
      
      const monthlyEnterprise = await User.countDocuments({
        user_role: 'Enterprise',
        createdAt: { $gte: date, $lt: nextMonth }
      });
      
      const monthlyFree = await User.countDocuments({
        user_role: 'Normal',
        createdAt: { $gte: date, $lt: nextMonth }
      });

      chartData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        total_users: monthlyTotal,
        enterprise_users: monthlyEnterprise,
        free_users: monthlyFree
      });
    }

    res.json(chartData);
  } catch (error) {
    console.error('Get user chart data error:', error);
    res.status(500).json({
      message: 'Server error while fetching user chart data'
    });
  }
});

module.exports = router;