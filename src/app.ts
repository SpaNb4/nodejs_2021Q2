import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import jwt from 'jsonwebtoken';

import userRouter from './resources/users/users.router';
import boardRouter from './resources/boards/boards.router';
import taskRouter from './resources/tasks/tasks.router';
import loginRouter from './resources/login/login.router';
import { morganLog } from './logger/logger';
import { errorHandler } from './logger/unhandledErrorsHandler';
import handleException from './logger/uncaughtErrorsHandler';
import { JWT_SECRET_KEY } from './common/config';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(morganLog);
handleException();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    jwt.verify(token!, JWT_SECRET_KEY!, (err: any, decoded: any) => {
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

app.use('/users', authenticateToken, userRouter);
app.use('/boards', authenticateToken, boardRouter);
app.use('/boards/:id/tasks/', authenticateToken, taskRouter);

app.use('/login', loginRouter);

app.use(errorHandler);

export default app;
