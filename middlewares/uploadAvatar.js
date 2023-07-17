const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { noFileUploadedMessage, internalServerErrorMessage } = require('../helpers/message');

const avatarUploader = multer({
  dest: 'tmp',
});

const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: noFileUploadedMessage });
    }

    const uniqueFileName = `${uuidv4()}-${req.file.originalname}`;
    const tempFilePath = req.file.path;
    const targetPath = path.join(__dirname, '../public/avatars', uniqueFileName);

    await fs.rename(tempFilePath, targetPath);

    req.user.avatarURL = `/avatars/${uniqueFileName}`;
    await req.user.save();

    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = { avatarUploader, uploadAvatar };