const { validationResult } = require('express-validator');
const User = require('../../models/User');

// @desc    Get all users (with pagination)
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const search = req.query.search || '';
    const accountType = req.query.accountType || '';
    const subscription = req.query.subscription || '';
    
    // Build filter object
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (accountType) filter.accountType = accountType;
    if (subscription) filter.subscription = subscription;
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user by ID
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }
    
    const { name, email, subscription, isEmailVerified, website } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
      user.email = email;
    }
    
    if (name) user.name = name;
    if (subscription) user.subscription = subscription;
    if (typeof isEmailVerified === 'boolean') user.isEmailVerified = isEmailVerified;
    if (website) user.website = website;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        website: user.website,
        avatar: user.avatar,
        subscription: user.subscription,
        accountType: user.accountType,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 
      lastLoginAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    
    const subscriptionStats = await User.aggregate([
      {
        $group: {
          _id: '$subscription',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const accountTypeStats = await User.aggregate([
      {
        $group: {
          _id: '$accountType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Recent users (last 10)
    const recentUsers = await User.find()
      .select('name email createdAt accountType')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        newUsersThisMonth,
        subscriptionStats: subscriptionStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        accountTypeStats: accountTypeStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        recentUsers
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Bulk update users
// @route   PUT /api/admin/users/bulk
// @access  Private (Admin only)
const bulkUpdateUsers = async (req, res) => {
  try {
    const { userIds, updates } = req.body;
    
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'User IDs array is required'
      });
    }
    
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Updates object is required'
      });
    }
    
    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: updates }
    );
    
    res.json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} users`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Bulk update users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
  bulkUpdateUsers
};
