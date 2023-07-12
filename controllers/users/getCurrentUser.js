const User = require('../../models/userModel');
const { internalServerErrorMessage, notAuthorizedMessage } = require('../../helpers/message');

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const currentUser = await User.findById(userId, { password: 0 });

    if (!currentUser) {
      return res.status(401).json({ message: notAuthorizedMessage });
    }

    res.status(200).json({ email: currentUser.email, subscription: currentUser.subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = getCurrentUser;