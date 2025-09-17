const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../../middleware/auth');
const {
  register,
  login,
  googleAuth,
  getMe,
  logout,
  updateProfile
} = require('../../controllers/user/authController');

const router = express.Router();

// @route   POST /api/user/auth/register
// @desc    Register user with email & password
// @access  Public
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('website').optional().isURL().withMessage('Please provide a valid website URL')
], register);

// @route   POST /api/user/auth/login
// @desc    Login user with email & password
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], login);

// @route   POST /api/user/auth/google/register
// @desc    Register/Login user with Google OAuth
// @access  Public
router.post('/google/register', googleAuth);

// @route   GET /api/user/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getMe);

// @route   POST /api/user/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', auth, logout);

// @route   PUT /api/user/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('website').optional().isURL()
], updateProfile);

module.exports = router;
