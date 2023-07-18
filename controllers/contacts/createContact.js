const {internalServerErrorMessage, failedValidationMessage} = require('../../helpers/message')
const Contact = require('../../models/contactModel');

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    if (error instanceof Contact.ValidationError) {
      res.status(400).json({ message: failedValidationMessage });
    } else {
      res.status(500).json({ message: internalServerErrorMessage });
    }
  }
};

module.exports = createContact;