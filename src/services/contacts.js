import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsCount = await ContactsCollection.countDocuments(filter);
    const contacts = await ContactsCollection
      .find(filter)
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
  
    return {
      data: contacts,
      ...paginationData,
    };
  };
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};
export const createNewContact = async(payload) => {
    const newContact = await ContactsCollection.create(payload);
    return newContact;
};
export const deleteContact = async(contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId
    });
    return contact;
};
export const updateContact = async(contactId, payload) => {
    const result = await ContactsCollection.findOneAndUpdate(
       {  _id: contactId },
        payload,
        { new: true,
          runValidators: false
        }
    );
    if(!result) return null;
    return {
        contact: result,
        isNew: false,
    };
};
