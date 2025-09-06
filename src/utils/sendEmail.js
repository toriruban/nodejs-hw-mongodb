import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';

const transport = nodemailer.createTransport({
    port:  Number(getEnvVar(ENV_VARS.SMTP_PORT)),
    host: getEnvVar(ENV_VARS.SMTP_HOST),
    secure: true,
    auth: {
        user: getEnvVar(ENV_VARS.SMTP_USER),
        pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
    }
});

export const sendEmail = async({to, subject, html}) => {
    try {
        await transport.sendMail({
            to,
            subject,
            html,
            from: getEnvVar(ENV_VARS.SMTP_FROM),
        });
    } catch (err) {
        throw createHttpError(500, 'Failed to send the email, please try again later.')

    }
};
