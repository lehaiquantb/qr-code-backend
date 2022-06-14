import { ServiceTypeModule } from './modules/service-type/service-type.module';
import { ServiceRequestModule } from './modules/service-request/service-request.module';
import { ServiceModule } from './modules/service/service.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from './modules/common/common.module';
import { I18nModule } from './common/services/i18n.service';
import { WinstonModule } from './common/services/winston.service';
import { DatabaseModule } from './common/services/database.module';
import { AppController } from './app.controller';
import envSchema from './common/config/validation-schema';
import { ConfigModule } from '@nestjs/config';

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
        ServiceModule,
        ServiceRequestModule,
        ServiceTypeModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
