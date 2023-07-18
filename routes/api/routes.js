const express = require('express');
const contactsRouter = require('./contacts');
const usersRouter = require('./users');

const routers = express.Router();

router.use('/api/contacts', contactsRouter);
router.use('/api/users', usersRouter);

module.exports = routers;