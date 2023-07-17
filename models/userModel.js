const mongoose = require('mongoose');
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business', 'free'],
    default: 'starter',
  },
  token: String,
  avatarURL: String,
},
{
  versionKey: false,
  timestamps: true,
});

userSchema.pre('save', function (next) {
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mm' });
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;