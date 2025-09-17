const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);
  
  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      website: user.website,
      avatar: user.avatar,
      subscription: user.subscription,
      accountType: user.accountType,
      isEmailVerified: user.isEmailVerified
    }
  });
};

// @desc    Register user with email & password
// @route   POST /api/user/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { name, email, password, website } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      website,
      accountType: 'email'
    });

    sendTokenResponse(user, 201, res, 'Account created successfully! Welcome to AqlBot! 🎉');

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user with email & password
// @route   POST /api/user/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    sendTokenResponse(user, 200, res, 'Login successful! Welcome back! 🚀');

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Register/Login user with Google OAuth
// @route   POST /api/user/auth/google/register
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Google token is required'
      });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ email }, { googleId }] 
    });

    if (user) {
      // User exists, update login time and return
      user.lastLoginAt = new Date();
      if (!user.googleId && user.accountType === 'email') {
        // Link Google account to existing email account
        user.googleId = googleId;
        user.avatar = picture;
      }
      await user.save();

      return sendTokenResponse(user, 200, res, 'Welcome back! 🚀');
    }

    // Create new user with Google data
    user = await User.create({
      name,
      email,
      googleId,
      avatar: picture,
      accountType: 'google',
      isEmailVerified: true // Google emails are verified
    });

    sendTokenResponse(user, 201, res, 'Account created successfully! Welcome to AqlBot! 🎉');

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed'
    });
  }
};

// @desc    Get current user
// @route   GET /api/user/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        website: user.website,
        avatar: user.avatar,
        subscription: user.subscription,
        accountType: user.accountType,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/user/auth/logout
// @access  Private
const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully! 👋'
  });
};

// @desc    Update user profile
// @route   PUT /api/user/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { name, website } = req.body;
    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (website) user.website = website;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully! ✅',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        website: user.website,
        avatar: user.avatar,
        subscription: user.subscription,
        accountType: user.accountType,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  getMe,
  logout,
  updateProfile
};
