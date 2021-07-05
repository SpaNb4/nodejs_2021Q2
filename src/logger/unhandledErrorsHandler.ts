import { ErrorRequestHandler } from 'express';
import { logger } from './logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    logger.error(`${err.status} ${err.message}`);
    res.status(err.status || 500).json({ status: err.status, message: err.message });
};
