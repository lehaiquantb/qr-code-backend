import { UserRepository } from './modules/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from './common/modules/common.module';
import { I18nModule } from './common/modules/i18n/i18n.module';
import { WinstonModule } from './common/modules/winston/winston.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { AppController } from './app.controller';
import envSchema from './common/config/validation-schema';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '~product/product.module';
import { CategoryModule } from '~category/category.module';
import { FileModule } from '~file/file.module';
import { ActionModule } from '~action/action.module';
import { ProviderModule } from '~provider/provider.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: envSchema,
        }),
        WinstonModule,
        I18nModule,
        CommonModule,
        ScheduleModule.forRoot(),
        DatabaseModule,
        AuthModule,
        RoleModule,
        UserModule,
        TypeOrmModule.forFeature([UserRepository]),
        ProductModule,
        ActionModule,
        CategoryModule,
        FileModule,
        ProviderModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
