import { Router } from 'express';
import { getContactsController, getContactsByIdController } from '../controllers/contacts.js';

const router = Router();
    router.get('/',getContactsController);  
    router.get('/:contactId', getContactsByIdController);
export default router;