const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized to access this route'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          message: 'No user found with this token'
        });
      }

      if (user.status === 'inactive') {
        return res.status(401).json({
          message: 'User account is inactive'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      message: 'Server error in authentication'
    });
  }
};

// Admin authorization middleware
const adminAuth = (req, res, next) => {
  if (req.user && req.user.user_role === 'Admin') {
    next();
  } else {
    res.status(403).json({
      message: 'Access denied. Admin privileges required.'
    });
  }
};

// Enterprise or Admin authorization middleware
const enterpriseAuth = (req, res, next) => {
  if (req.user && (req.user.user_role === 'Enterprise' || req.user.user_role === 'Admin')) {
    next();
  } else {
    res.status(403).json({
      message: 'Access denied. Enterprise or Admin privileges required.'
    });
  }
};

module.exports = { auth, adminAuth, enterpriseAuth };