import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err.message);
    res.status(500).send('Oops, something broke!');
};
