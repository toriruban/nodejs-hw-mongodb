import { Router } from 'express';
import { getContactsController, 
         getContactsByIdController, 
         createNewContactController, 
         deleteContactController,
         patchContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contactsSchema.js'
import { isValidId } from '../middlewares/isValidId.js'

const router = Router();
    router.get('/',ctrlWrapper(getContactsController));  
    router.get('/:contactId', 
                isValidId,
                ctrlWrapper(getContactsByIdController));

    router.post('/', 
                validateBody(createContactSchema),
                ctrlWrapper(createNewContactController));

    router.patch('/:contactId',
                isValidId, 
                validateBody(updateContactSchema),
                ctrlWrapper(patchContactController));

    router.delete('/:contactId', 
                isValidId,
                ctrlWrapper(deleteContactController));
export default router;