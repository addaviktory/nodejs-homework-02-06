const express = require('express');
const router = express.Router();
const {
  validateContact,
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateFavoriteStatus,
} = require('../../controllers/contactController');


router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', validateContact, createContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', validateContact, updateContact);
router.patch('/:contactId/favorite', updateFavoriteStatus);

module.exports = router;