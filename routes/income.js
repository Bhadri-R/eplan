const express = require('express');
const { body, validationResult } = require('express-validator');
const Income = require('../models/Income');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/income/income
// @desc    Get user income data and income goal
// @access  Private
router.get('/income/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    // Get the income goal from the latest income record
    let incomeGoal = 0;
    if (incomes.length > 0) {
      incomeGoal = incomes[0].incomeGoal;
    }

    res.json({
      data: incomes,
      incomeGoal: incomeGoal
    });
  } catch (error) {
    console.error('Get income error:', error);
    res.status(500).json({
      message: 'Server error while fetching income data'
    });
  }
});

// @route   POST /api/income/income
// @desc    Create income records
// @access  Private
router.post('/income/', auth, async (req, res) => {
  try {
    const incomeData = req.body;
    
    if (!Array.isArray(incomeData)) {
      return res.status(400).json({
        message: 'Income data must be an array'
      });
    }

    const incomes = [];
    for (const income of incomeData) {
      const newIncome = await Income.create({
        user: req.user.id,
        ...income
      });
      incomes.push(newIncome);
    }

    res.status(201).json({
      message: 'Income records created successfully',
      incomes
    });
  } catch (error) {
    console.error('Create income error:', error);
    res.status(500).json({
      message: 'Server error while creating income records'
    });
  }
});

// @route   PUT /api/income/income/:id
// @desc    Update income record
// @access  Private
router.put('/income/:id', auth, async (req, res) => {
  try {
    const income = await Income.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!income) {
      return res.status(404).json({
        message: 'Income record not found'
      });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Income record updated successfully',
      income: updatedIncome
    });
  } catch (error) {
    console.error('Update income error:', error);
    res.status(500).json({
      message: 'Server error while updating income record'
    });
  }
});

// @route   DELETE /api/income/income/:id
// @desc    Delete income record
// @access  Private
router.delete('/income/:id', auth, async (req, res) => {
  try {
    const income = await Income.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!income) {
      return res.status(404).json({
        message: 'Income record not found'
      });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Income record deleted successfully'
    });
  } catch (error) {
    console.error('Delete income error:', error);
    res.status(500).json({
      message: 'Server error while deleting income record'
    });
  }
});

module.exports = router;