const User = require('../../models/userModel');
const { internalServerErrorMessage, notAuthorizedMessage } = require('../../helpers/message');

const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ message: notAuthorizedMessage });
    }

    const userId = currentUser._id;
    const { email, subscription } = await User.findById(userId, { password: 0 });

    res.status(200).json({ email, subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = getCurrentUser;