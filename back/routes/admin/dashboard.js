const express = require('express');
const { adminAuth } = require('../../middleware/adminAuth');
const { getDashboardStats } = require('../../controllers/admin/adminController');

const router = express.Router();

// Apply admin auth middleware to all routes
router.use(adminAuth);

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/stats', getDashboardStats);

module.exports = router;
