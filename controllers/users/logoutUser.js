const User = require('../../models/userModel');
const { internalServerErrorMessage, notAuthorizedMessage } = require('../../helpers/message');

const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { token: '' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.name === 'UnauthorizedError') {
      res.status(401).json({ message: notAuthorizedMessage });
    } else {
      res.status(500).json({ message: internalServerErrorMessage });
    }
  }
};

module.exports = logoutUser;