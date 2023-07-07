const { internalServerErrorMessage, notFoundMessage } = require('../../helpers/message');
const Contact = require('../../models/contactModel');

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

module.exports = getContactById;
  