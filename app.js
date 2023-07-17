const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { internalServerErrorMessage, notFoundMessage } = require('./helpers/message');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
  


app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use(express.static('public'));
app.use((req, res, next) => {
  res.status(404).json({ message: notFoundMessage });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: internalServerErrorMessage });
});

module.exports = app;