import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token!, JWT_SECRET_KEY!, (err, decoded) => {
        if (err) {
            res.status(403);
        }

        if (decoded) {
            next();
        } else {
            res.status(401).json('Invalid token provided');
        }
    });
}

export default authenticateToken;
