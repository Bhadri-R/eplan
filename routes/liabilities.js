const express = require('express');
const { body, validationResult } = require('express-validator');
const Liability = require('../models/Liability');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/liability/liability
// @desc    Get user liabilities
// @access  Private
router.get('/liability/', auth, async (req, res) => {
  try {
    const liabilities = await Liability.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(liabilities);
  } catch (error) {
    console.error('Get liabilities error:', error);
    res.status(500).json({
      message: 'Server error while fetching liabilities'
    });
  }
});

// @route   POST /api/liability/liability
// @desc    Create liabilities
// @access  Private
router.post('/liability/', auth, async (req, res) => {
  try {
    const liabilitiesData = req.body;
    
    if (!Array.isArray(liabilitiesData)) {
      return res.status(400).json({
        message: 'Liabilities data must be an array'
      });
    }

    const liabilities = [];
    for (const liabilityData of liabilitiesData) {
      const liability = await Liability.create({
        user: req.user.id,
        ...liabilityData
      });
      liabilities.push(liability);
    }

    res.status(201).json({
      message: 'Liabilities created successfully',
      liabilities
    });
  } catch (error) {
    console.error('Create liabilities error:', error);
    res.status(500).json({
      message: 'Server error while creating liabilities'
    });
  }
});

// @route   PUT /api/liability/liability/:id
// @desc    Update liability
// @access  Private
router.put('/liability/:id', auth, async (req, res) => {
  try {
    const liability = await Liability.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!liability) {
      return res.status(404).json({
        message: 'Liability not found'
      });
    }

    const updatedLiability = await Liability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Liability updated successfully',
      liability: updatedLiability
    });
  } catch (error) {
    console.error('Update liability error:', error);
    res.status(500).json({
      message: 'Server error while updating liability'
    });
  }
});

// @route   DELETE /api/liability/liability/:id
// @desc    Delete liability
// @access  Private
router.delete('/liability/:id', auth, async (req, res) => {
  try {
    const liability = await Liability.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!liability) {
      return res.status(404).json({
        message: 'Liability not found'
      });
    }

    await Liability.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Liability deleted successfully'
    });
  } catch (error) {
    console.error('Delete liability error:', error);
    res.status(500).json({
      message: 'Server error while deleting liability'
    });
  }
});

module.exports = router;