const express = require('express');
const router = express.Router();
const { validateContacts} = require('../../middlewares/validateContacts');

const getContacts = require('../../controllers/contacts/getAllContacts');
const getContactById = require('../../controllers/contacts/getContactById');
const createContact = require('../../controllers/contacts/createContact');
const deleteContact = require('../../controllers/contacts/deleteContact');
const updateContact = require('../../controllers/contacts/updateContact');
const updateFavoriteStatus = require('../../controllers/contacts/updateFavoriteStatus');

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', validateContacts, createContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', updateContact);
router.patch('/:contactId/favorite', updateFavoriteStatus);

module.exports = router;