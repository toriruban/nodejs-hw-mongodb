import routeHttpError  from 'http-errors';

export const notFoundHandler = (req, res, next) => {
    next(routeHttpError(404, 'Route not found'))
};