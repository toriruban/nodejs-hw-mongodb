import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const registerUser = async(payload) => {
    const user = await User.findOne({ email: payload.email });
    if(user) throw createHttpError(409, 'Email in use');
        
    const encryptedPassword = await bcrypt.hash(payload.password, 10); 
    return await User.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw createHttpError(401, 'User with given credentials does not exist!');
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);
    if(!arePasswordsEqual) {
        throw createHttpError(401, 'User with given credentials does not exist!');
    }
    await Session.deleteOne({  userId: user._id, });

    const session = await Session.create({
        accessToken: crypto.randomBytes(30).toString('base64'),
        refreshToken: crypto.randomBytes(30).toString('base64'),
        accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
        refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        userId: user._id,
    });
    return session;
};

export const logoutUser = async(sessionId) => {
    await Session.findByIdAndDelete(sessionId);
};