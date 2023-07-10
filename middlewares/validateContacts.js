const contactSchema = require('../schemas/contactSchema');

const validateContacts = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateContacts
};

