const { internalServerErrorMessage, contactDeleteMessage, notFoundMessage } = require('../../helpers/message');
const Contact = require('../../models/contactModel');

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

module.exports = deleteContact;