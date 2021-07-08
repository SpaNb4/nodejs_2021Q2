/* eslint-disable @typescript-eslint/dot-notation */
import morgan from 'morgan';
import winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { Request } from 'express';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf((info) => {
    if (info instanceof Error) {
        return `${info['timestamp']} ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info['timestamp']} ${info.level}: ${info.message}`;
});

export const myLogger = WinstonModule.createLogger({
    format: combine(winston.format.splat(), label({ label: __filename }), timestamp(), myFormat),
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' }),
    ],
});

morgan.token('body', (req: Request, _res) => JSON.stringify(req.body));
morgan.token('query', (req: Request, _res) => JSON.stringify(req.query));
export const morganLog = morgan(':method :url :status :body :query', {
    stream: { write: (message) => myLogger.log(message.trim()) },
});
