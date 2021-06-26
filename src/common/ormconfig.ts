import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from './config';
import User from '../resources/users/users.model';
import Task from '../resources/tasks/tasks.model';
import Board from '../resources/boards/boards.model';

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'host.docker.internal',
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [User, Task, Board],
    logging: false,
    migrations: ['src/migrations/**/*.{ts,js}'],
    migrationsRun: true,
    cli: {
        migrationsDir: 'src/migrations',
    },
};

export default typeOrmConfig;
