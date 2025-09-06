const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  website: {
    type: String,
    trim: true
  },
  googleId: {
    type: String,
    sparse: true // Allow multiple null values but unique non-null values
  },
  avatar: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  accountType: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['starter', 'pro', 'enterprise'],
      default: 'starter'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'trial'],
      default: 'trial'
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    }
  },
  chatbots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatbot'
  }],
  lastLoginAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.googleId;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
