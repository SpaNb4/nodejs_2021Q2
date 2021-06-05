import { ErrorRequestHandler } from 'express';
import { logger } from './logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err);
    logger.error(`${err} Internal Server Error`);
    res.status(500).send('Oops, something broke!');
};
