const verifyEmail = require('./verifyEmail');
const resendVerificationEmail = require('./resendVerificationEmail')
const emailService = require('./emailService')


module.exports = {
    resendVerificationEmail,
    verifyEmail,
    emailService,
  };