const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
const {internalServerErrorMessage} = require('../../helpers/message');

const updateAvatar = async (req, res, next) => {
  try {
    const avatar = req.file;

    const processedAvatar = await jimp.read(avatar.path);
    processedAvatar.resize(250, 250);

    const uniqueFileName = `${uuid.v4()}${path.extname(avatar.originalname)}`;

    const avatarDirectory = path.join(__dirname, '../../public/avatars');

    await processedAvatar.writeAsync(`${avatarDirectory}/${uniqueFileName}`);

    req.user.avatarURL = `/avatars/${uniqueFileName}`;
    await req.user.save();
    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = updateAvatar;