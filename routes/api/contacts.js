const express = require('express');
const router = express.Router();
const { validateContacts} = require('../../middlewares/validateContacts');

const controller = require('../../controllers/contacts')

router.get('/', controller.getContacts );
router.get('/:contactId', controller.getContactById);
router.post('/', validateContacts, controller.createContact);
router.delete('/:contactId', controller.deleteContact);
router.put('/:contactId',validateContacts, controller.updateContact);
router.patch('/:contactId/favorite', controller.updateFavoriteStatus);

module.exports = router;