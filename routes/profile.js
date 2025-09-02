const express = require('express');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/myprofile/profile
// @desc    Get user profile
// @access  Private
router.get('/profile/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error while fetching profile'
    });
  }
});

// @route   POST /api/myprofile/profile
// @desc    Create user profile
// @access  Private
router.post('/profile/', auth, [
  body('clientEmail').isEmail().withMessage('Please enter a valid client email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg
      });
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        message: 'Profile already exists for this user'
      });
    }

    const profileData = {
      user: req.user.id,
      ...req.body
    };

    const profile = await Profile.create(profileData);

    res.status(201).json({
      message: 'Profile created successfully',
      profile
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      message: 'Server error while creating profile'
    });
  }
});

// @route   PUT /api/myprofile/profile/:id
// @desc    Update user profile
// @access  Private
router.put('/profile/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Server error while updating profile'
    });
  }
});

// @route   GET /api/myprofile/source
// @desc    Get client and spouse names for dropdowns
// @access  Private
router.get('/source/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    res.json({
      clientName: profile.clientName || '',
      spouseName: profile.spouseName || ''
    });
  } catch (error) {
    console.error('Get source error:', error);
    res.status(500).json({
      message: 'Server error while fetching source data'
    });
  }
});

module.exports = router;