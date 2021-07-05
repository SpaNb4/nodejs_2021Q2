import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';

function authenticateToken(req: Request, _res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token!, JWT_SECRET_KEY!, (err, _decoded) => {
        if (err) {
            throw Object.assign(new Error(err.message), { status: 401 });
        }
        next();
    });
}

export default authenticateToken;
