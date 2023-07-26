const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const { validationResult } = require('express-validator');
const { internalServerErrorMessage, errorPasswordEmailMessage, unverifiedEmailMessage } = require('../../helpers/message'); // Додайте повідомлення для неверифікованого email

const loginUser = async (req, res, next) => {
  try {
    const { error } = validationResult(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: errorPasswordEmailMessage });
    }

    if (!user.verify) {
      return res.status(403).json({ message: unverifiedEmailMessage });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: errorPasswordEmailMessage });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = loginUser;