import { Router } from 'express';
import { getContactsController, getContactsByIdController, createNewContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
    router.get('/',ctrlWrapper(getContactsController));  
    router.get('/:contactId', ctrlWrapper(getContactsByIdController));
    router.post('/', ctrlWrapper(createNewContactController));
export default router;