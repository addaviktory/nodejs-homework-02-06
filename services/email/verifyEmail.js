const User = require('../../models/userModel');
const { verificationSuccessMessage, internalServerErrorMessage, notFoundMessage, alreadyVerifiedMessage } = require('../../helpers/message');
const mongoose = require('mongoose');

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    console.log('Received verification token:', verificationToken);

    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const user = await User.findOne({ verificationToken });
    console.log('Found user:', user);
    await mongoose.disconnect();

    if (!user) {
      return res.status(404).json({ message: notFoundMessage });
    }

    if (user.verify) {
      return res.status(409).json({ message: alreadyVerifiedMessage });
    }
    user.verify = true;
    await user.save();

    return res.status(200).json({ message: verificationSuccessMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = verifyEmail;