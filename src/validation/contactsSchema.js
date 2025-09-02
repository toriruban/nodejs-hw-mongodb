import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20).email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20).email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
    userId: Joi.string().custom((value, helper) => {
        if(value && !isValidObjectId(value)) {
            return helper.message('The ID must belong to the appropriate user.')
        }
        return true;
    }),
});