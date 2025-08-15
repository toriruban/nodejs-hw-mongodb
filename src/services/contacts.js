import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
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
    return contact 
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
