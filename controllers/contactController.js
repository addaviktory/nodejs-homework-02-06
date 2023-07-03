const contactSchema = require('../schemas/contactSchema');
const Contact = require('../models/contactModel');


const notFoundMessage = 'Not Found';
const internalServerErrorMessage = 'Internal Server Error';
const contactDeleteMessage = 'Contact deleted';


const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: notFoundMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (deletedContact) {
      res.json({ message: contactDeleteMessage, contact: deletedContact });
    } else {
      res.status(404).json({ message: notFoundMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: notFoundMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

const updateFavoriteStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: notFoundMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: internalServerErrorMessage });
  }
};

module.exports = {
  validateContact,
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateFavoriteStatus,
};