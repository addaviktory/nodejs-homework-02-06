const getContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const createContact = require('./createContact');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateContact');
const updateFavoriteStatus = require('./updateFavoriteStatus');

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateFavoriteStatus
}