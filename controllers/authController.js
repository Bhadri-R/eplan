const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      user_role: 'Normal'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      access_token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        user_role: user.user_role
      },
      expires_in: 7 * 24 * 60 * 60 // 7 days in seconds
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Server error during registration'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (user.status === 'inactive') {
      return res.status(401).json({
        message: 'Account is inactive. Please contact administrator.'
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      access_token: token,
      username: user.name,
      role: user.user_role,
      super: user.user_role === 'Admin',
      expires_in: 7 * 24 * 60 * 60 // 7 days in seconds
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login'
    });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'No user found with this email address'
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;

    // Send email (in production, you would actually send the email)
    const emailSent = await sendPasswordResetEmail(user.email, resetUrl);
    
    if (emailSent) {
      res.json({
        message: 'Password reset email sent successfully'
      });
    } else {
      res.status(500).json({
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      message: 'Server error during password reset request'
    });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { uid, token, new_password } = req.body;

    // Hash the token to compare with stored token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      _id: uid,
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = new_password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      message: 'Server error during password reset'
    });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};