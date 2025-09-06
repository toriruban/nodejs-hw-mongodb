import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController, loginUserController, logoutUserController, refreshTokenController, sendResetPasswordEmailController, resetPasswordController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/registerUserValidationSchema.js';
import { loginUserSchema } from '../validation/loginUserValidationSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendResetPasswordEmailValidationSchema } from '../validation/sendResetPasswordEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';

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
router.post(
    '/logout',
    ctrlWrapper(logoutUserController),
);
router.post(
    '/refresh',
    ctrlWrapper(refreshTokenController),
);

router.post(
    '/send-reset-email',
    validateBody(sendResetPasswordEmailValidationSchema),
    ctrlWrapper(sendResetPasswordEmailController),
);

router.post(
    '/reset-password',
    validateBody(resetPasswordValidationSchema),
    ctrlWrapper(resetPasswordController),
);

export default router;