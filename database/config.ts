import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

export const DatabaseConfig: ConnectionOptions[] = [
    {
        name: 'default',
        type: 'mysql',
        database: DB_NAME,
        port: parseInt(DB_PORT) || 3306,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        socketPath: null,
        synchronize: false,
        migrationsRun: false,
        charset: 'utf8mb4_unicode_ci',
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['database/migrations/**/*{.ts,.js}'],
        cli: { migrationsDir: 'database/migrations' },
    },
    {
        name: 'seed',
        type: 'mysql',
        database: DB_NAME,
        port: parseInt(DB_PORT) || 3306,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        host: DB_HOST,
        socketPath: null,
        synchronize: false,
        migrationsRun: false,
        charset: 'utf8mb4_unicode_ci',
        entities: ['src/**/*.entity{.ts,.js}'],
        migrations: ['database/seedings/**/*{.ts,.js}'],
        cli: {
            migrationsDir: 'database/seeds',
        },
    },
];

export default DatabaseConfig;
