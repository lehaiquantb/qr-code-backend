import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FileLogger } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigKey from '../../config/config-key';
import { DatabaseConfig } from 'database/config';
import { NODE_ENV, DatabaseService } from '~common';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const mysqlDatabase = DatabaseConfig.find(
                    (item) => item.type === ConfigKey.DB_TYPE,
                );
                const {
                    database,
                    port,
                    username,
                    password,
                    host,
                    socketPath,
                    charset,
                } = mysqlDatabase as MysqlConnectionOptions;
                const isDevelopment =
                    configService.get(ConfigKey.NODE_ENV) ===
                    NODE_ENV.DEVELOPMENT;
                const options: TypeOrmModuleOptions = {
                    name: 'default',
                    type: 'mysql',
                    host,
                    port,
                    username,
                    password,
                    database,
                    charset,
                    entities: ['dist/**/*.entity{.ts,.js}'],
                    logger: new FileLogger(isDevelopment, {
                        logPath: 'logs/query.log',
                    }),
                    synchronize: false,
                };
                if (socketPath) {
                    Object.assign(options, { socketPath });
                }
                return options;
            },
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
