const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const getCurrentUser = require('./getCurrentUser');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerificationEmail = require('./resendVerificationEmail')
const emailService = require('./emailService')

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  resendVerificationEmail,
  verifyEmail,
  emailService,
};