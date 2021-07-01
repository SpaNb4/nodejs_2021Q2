"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_entity_1 = __importDefault(require("../users/entities/user.entity"));
dotenv_1.default.config();
const typeOrmConfig = {
    type: 'postgres',
    host: 'host.docker.internal',
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: [user_entity_1.default],
    logging: false,
    migrations: ['src/migrations/**/*.{ts,js}'],
    migrationsRun: true,
    cli: {
        migrationsDir: 'src/migrations',
    },
};
exports.default = typeOrmConfig;
