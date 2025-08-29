import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController, loginUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserSchema } from '../validation/loginUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();
router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

export default router;