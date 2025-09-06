import { registerUser, loginUser, logoutUser, refreshSession, sendResetPasswordEmail, resetPassword } from '../services/auth.js';

const setupSession = (session, res) => {
    res.cookie('refreshToken', session.refreshToken, {
        expires: session.refreshTokenValidUntil,
        httpOnly: true,
    });
    res.cookie('sessionId', session._id, {
        expires: session.refreshTokenValidUntil,
        httpOnly: true,
    });
}

export const registerUserController = async(req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async(req, res) => {
    const session = await loginUser(req.body);
    setupSession(session, res);

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const logoutUserController = async(req, res) => {
    await logoutUser(req.cookies.sessionId, req.cookies.refreshToken);

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    res.status(204).send();
};

export const refreshTokenController = async(req, res) => {
   const session = await refreshSession(req.cookies.sessionId, req.cookies.refreshToken);
   setupSession(session, res);

   res.status(200).json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
});
};

export const sendResetPasswordEmailController = async(req, res) => {
    await sendResetPasswordEmail(req.body.email);

    res.status(200).json({
        status: 200,
        message: 'Reset password email has been successfully sent.',
        data: {}
    });
};

export const resetPasswordController = async(req, res) => {
    await resetPassword(req.body.token, req.body.password);

    res.status(200).json({
        status: 200,
        message: 'Password has been successfully reset.',
        data: {}
    });
};
