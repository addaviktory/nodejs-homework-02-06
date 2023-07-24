const express = require('express');
const router = express.Router();
const validateUser = require('../../middlewares/validateUser');
const authenticateUser = require('../../middlewares/authenticateUser');
const controller = require('../../controllers/users');
const { avatarUploader, uploadAvatar } = require('../../middlewares/uploadAvatar');

router.post('/register', validateUser, controller.registerUser);
router.post('/login', validateUser, controller.loginUser);
router.post('/logout', authenticateUser, controller.logoutUser);
router.get('/current', authenticateUser, controller.getCurrentUser);
router.patch('/avatars', authenticateUser, avatarUploader.single('avatar'), uploadAvatar, controller.updateAvatar);

router.post('/verify', controller.resendVerificationEmail);
router.get('/verify/:verificationToken', controller.verifyEmail);

module.exports = router;