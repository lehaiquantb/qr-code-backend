import mysql from 'mysql2/promise';
import { ConnectionOptions } from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const options: ConnectionOptions = {
    host: DB_HOST,
    port: parseInt(DB_PORT) ?? 3306,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    // database: DB_NAME,
};

mysql.createConnection(options).then((connection) => {
    connection
        .query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`)
        .then((res) => {
            console.info(`Database ${DB_NAME} create or successfully checked`);
            process.exit(0);
        });
});
