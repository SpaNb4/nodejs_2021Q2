/* eslint-disable @typescript-eslint/dot-notation */
import winston from 'winston';
import { WinstonModule } from 'nest-winston';

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
