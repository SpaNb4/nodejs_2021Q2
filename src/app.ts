import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import userRouter from './resources/users/users.router';
import boardRouter from './resources/boards/boards.router';
import taskRouter from './resources/tasks/tasks.router';
import loginRouter from './resources/login/login.router';
import { morganLog } from './logger/logger';
import { errorHandler } from './logger/unhandledErrorsHandler';
import handleException from './logger/uncaughtErrorsHandler';
import authenticateToken from './common/authenticate';

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

app.use('/login', loginRouter);

app.use(authenticateToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:id/tasks/', taskRouter);

app.use(errorHandler);

export default app;
