import createHttpError from 'http-errors';
import { User } from '../db/models/user';

export const validateParams =async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if(!user.equals(req.user._id)) {
        throw createHttpError(403, 'You dont have access!')
    }
    return next();
}
