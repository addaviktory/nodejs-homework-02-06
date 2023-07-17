const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const User = require('../../models/userModel');
const { validationResult } = require('express-validator');
const { inUseEmailMessage, internalServerErrorMessage } = require('../../helpers/message');
const path = require('path');

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const defaultAvatarPath = path.join(__dirname, '../../public/avatars/avatar.jpeg');
    const avatarURL = `https:${gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })}`;

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter',
      avatarURL: avatarURL || defaultAvatarPath,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = registerUser;