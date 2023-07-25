const User = require('../../models/userModel');
const emailService = require('./emailService');
const { missingEmailFieldMessage, internalServerErrorMessage, notFoundMessage, verificationEmailSentMessage} = require('../../helpers/message');

async function resendVerificationEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: missingEmailFieldMessage });
    }
    const user = await User.findOne({ email });

    if (!user || user.verify) {
      return res.status(400).json({ message: user ? verificationAlreadyMessage : notFoundMessage });
    }

    await emailService.sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ message: verificationEmailSentMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
}

module.exports = resendVerificationEmail;