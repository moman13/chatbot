const express = require('express');
const userRoutes = require('./users');
const dashboardRoutes = require('./dashboard');

const router = express.Router();

// Mount admin routes
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

// Add other admin routes here in the future
// router.use('/chatbots', chatbotRoutes);
// router.use('/analytics', analyticsRoutes);
// router.use('/settings', settingsRoutes);

module.exports = router;
