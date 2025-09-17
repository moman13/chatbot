const express = require('express');
const { body } = require('express-validator');
const { adminAuth } = require('../../middleware/adminAuth');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  bulkUpdateUsers
} = require('../../controllers/admin/adminController');

const router = express.Router();

// Apply admin auth middleware to all routes
router.use(adminAuth);

// @route   GET /api/admin/users
// @desc    Get all users (with pagination and filtering)
// @access  Private (Admin only)
router.get('/', getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private (Admin only)
router.get('/:id', getUserById);

// @route   PUT /api/admin/users/:id
// @desc    Update user by ID
// @access  Private (Admin only)
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('subscription').optional().isIn(['free', 'pro', 'enterprise']).withMessage('Invalid subscription type'),
  body('isEmailVerified').optional().isBoolean().withMessage('Email verification must be boolean'),
  body('website').optional().isURL().withMessage('Please provide a valid website URL')
], updateUser);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user by ID
// @access  Private (Admin only)
router.delete('/:id', deleteUser);

// @route   PUT /api/admin/users/bulk
// @desc    Bulk update users
// @access  Private (Admin only)
router.put('/bulk', [
  body('userIds').isArray({ min: 1 }).withMessage('User IDs array is required'),
  body('updates').isObject().withMessage('Updates object is required')
], bulkUpdateUsers);

module.exports = router;
