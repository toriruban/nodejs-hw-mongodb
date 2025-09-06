import Joi from 'joi';

export const sendResetPasswordEmailValidationSchema = Joi.object(
{
    email: Joi.string().email().required(),
});