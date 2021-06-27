import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

export const {
    PORT,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    NODE_ENV,
    JWT_SECRET_KEY,
} = process.env;
export const AUTH_MODE = process.env['AUTH_MODE'] === 'true';
