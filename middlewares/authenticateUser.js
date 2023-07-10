const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { internalServerErrorMessage, unauthorizedMessage } = require('../helpers/message');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: unauthorizedMessage });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const user = await User.findById(userId);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: unauthorizedMessage });
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = authenticateUser;