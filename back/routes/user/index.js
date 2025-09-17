const express = require('express');
const authRoutes = require('./auth');

const router = express.Router();

// Mount auth routes
router.use('/auth', authRoutes);

// Add other user routes here in the future
// router.use('/chatbot', chatbotRoutes);
// router.use('/analytics', analyticsRoutes);
// router.use('/settings', settingsRoutes);

module.exports = router;
