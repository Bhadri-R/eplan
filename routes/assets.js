const express = require('express');
const { body, validationResult } = require('express-validator');
const Asset = require('../models/Asset');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/assets/assets
// @desc    Get user assets
// @access  Private
router.get('/assets/', auth, async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    console.error('Get assets error:', error);
    res.status(500).json({
      message: 'Server error while fetching assets'
    });
  }
});

// @route   POST /api/assets/assets
// @desc    Create assets
// @access  Private
router.post('/assets/', auth, async (req, res) => {
  try {
    const assetsData = req.body;
    
    if (!Array.isArray(assetsData)) {
      return res.status(400).json({
        message: 'Assets data must be an array'
      });
    }

    const assets = [];
    for (const assetData of assetsData) {
      const asset = await Asset.create({
        user: req.user.id,
        ...assetData
      });
      assets.push(asset);
    }

    res.status(201).json({
      message: 'Assets created successfully',
      assets
    });
  } catch (error) {
    console.error('Create assets error:', error);
    res.status(500).json({
      message: 'Server error while creating assets'
    });
  }
});

// @route   PUT /api/assets/assets/:id
// @desc    Update asset
// @access  Private
router.put('/assets/:id', auth, async (req, res) => {
  try {
    const asset = await Asset.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!asset) {
      return res.status(404).json({
        message: 'Asset not found'
      });
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Asset updated successfully',
      asset: updatedAsset
    });
  } catch (error) {
    console.error('Update asset error:', error);
    res.status(500).json({
      message: 'Server error while updating asset'
    });
  }
});

// @route   DELETE /api/assets/assets/:id
// @desc    Delete asset
// @access  Private
router.delete('/assets/:id', auth, async (req, res) => {
  try {
    const asset = await Asset.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!asset) {
      return res.status(404).json({
        message: 'Asset not found'
      });
    }

    await Asset.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    console.error('Delete asset error:', error);
    res.status(500).json({
      message: 'Server error while deleting asset'
    });
  }
});

module.exports = router;