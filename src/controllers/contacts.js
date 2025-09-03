import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createNewContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page = 1, perPage = 10 } = parsePaginationParams(req.query) ?? {};
  const { sortBy = 'createdAt', sortOrder = 'asc' } = parseSortParams(req.query) ?? {};
  const { filter = {} } = parseFilterParams(req.query) ?? {};

  const contacts = await getAllContacts({
    userId: req.user._id,
    page, perPage, sortBy, sortOrder, filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createNewContactController = async (req, res) => {
  const newContact = await createNewContact(req.body, req.user._id);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) throw createHttpError(404, 'Contact not found');
  res.status(204).send();
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, req.user._id);
  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};