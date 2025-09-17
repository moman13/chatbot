const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');
    
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }
    
    // Extract token from "Bearer TOKEN"
    const actualToken = token.slice(7);
    
    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = { adminAuth };
