import { httpError } from 'http-errors';

export const notFoundHandler = (req, res, next) => {
    next(httpError(404, 'Route not found'))
};