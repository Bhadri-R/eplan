const express = require('express');
const DefaultParameter = require('../models/DefaultParameter');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/default/default-parameters
// @desc    Get default parameters
// @access  Private (Admin only)
router.get('/default-parameters/', auth, adminAuth, async (req, res) => {
  try {
    let defaultParams = await DefaultParameter.findOne();
    
    if (!defaultParams) {
      // Create default parameters if they don't exist
      defaultParams = await DefaultParameter.create({});
    }

    res.json({
      default_parameters: defaultParams
    });
  } catch (error) {
    console.error('Get default parameters error:', error);
    res.status(500).json({
      message: 'Server error while fetching default parameters'
    });
  }
});

// @route   PUT /api/default/default-parameters
// @desc    Update default parameters
// @access  Private (Admin only)
router.put('/default-parameters/', auth, adminAuth, async (req, res) => {
  try {
    let defaultParams = await DefaultParameter.findOne();
    
    if (!defaultParams) {
      defaultParams = await DefaultParameter.create(req.body);
    } else {
      defaultParams = await DefaultParameter.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json({
      message: 'Default parameters updated successfully',
      default_parameters: defaultParams
    });
  } catch (error) {
    console.error('Update default parameters error:', error);
    res.status(500).json({
      message: 'Server error while updating default parameters'
    });
  }
});

module.exports = router;