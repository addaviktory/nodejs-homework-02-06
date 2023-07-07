const internalServerErrorMessage = require('../../helpers/message')
const Contact = require('../../models/contactModel');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = getContacts;