import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const query = { ...filter, userId };

  const contactsCount = await ContactsCollection.countDocuments(query);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  const currentPage = paginationData.page;
  const limit = perPage;
  const skip = (currentPage - 1) * perPage;

  const contacts = await ContactsCollection
    .find(query)
    .select('-__v')
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createNewContact = async (payload, userId) => {
  const newContact = await ContactsCollection.create({ ...payload, userId });
  return newContact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      runValidators: false, 
    },
  );

  if (!result) return null;

  return {
    contact: result,
    isNew: false,
  };
};
