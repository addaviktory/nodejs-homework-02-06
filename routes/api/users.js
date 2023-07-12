const express = require('express');
const router = express.Router();
const validateUser = require('../../middlewares/validateUser');
const authenticateUser = require('../../middlewares/authenticateUser')
const controller = require('../../controllers/users')

router.post('/register', validateUser, controller.registerUser);
router.post('/login', validateUser, controller.loginUser);
router.post('/logout', authenticateUser, controller.logoutUser);
router.get('/current', authenticateUser, controller.getCurrentUser);

module.exports = router;