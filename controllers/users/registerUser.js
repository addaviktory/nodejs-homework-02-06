const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
const { validationResult } = require('express-validator');
const { inUseEmailMessage, internalServerErrorMessage} = require('../../helpers/message');


const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: inUseEmailMessage });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter',
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage});
  }
};

module.exports = registerUser